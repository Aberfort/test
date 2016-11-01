<?php

$ut_cookie_names = [
	'UNIQID'			=> 'is_uniqid',
	'UTM_CAMPAGAIN'		=> 'is_utm_campaign',
	'UTM_SOURCE'		=> 'is_utm_source',
	'UTM_MEDIUM'		=> 'is_utm_medium',
	'UTM_TERM'			=> 'is_utm_term',
	'UTM_CONTENT'		=> 'is_utm_content',
	'LANDING_URL'		=> 'is_landing_url',
	'NETWORK'			=> 'is_network',
	'DEVICE'			=> 'is_device',
	'GCLID'				=> 'is_gclid',
	'INTELLECTSOFT'		=> 'intellectsoft',
	'MEDIUM_HISTORY'	=> 'is_medium_history',
	'REFERRAL_MODE'		=> 'is_refmode',
	'TIMER'				=> 'is_timer',
];

# Список обновляемых кук
$cookieNames = [
	$ut_cookie_names['UNIQID'],
	$ut_cookie_names['UTM_CAMPAGAIN'],
	$ut_cookie_names['UTM_SOURCE'],
	$ut_cookie_names['UTM_MEDIUM'],
	$ut_cookie_names['UTM_TERM'],
	$ut_cookie_names['UTM_CONTENT'],
	$ut_cookie_names['LANDING_URL'],
	$ut_cookie_names['NETWORK'],
	$ut_cookie_names['DEVICE'],
	$ut_cookie_names['GCLID'],
	$ut_cookie_names['INTELLECTSOFT'],
	$ut_cookie_names['MEDIUM_HISTORY'],
	$ut_cookie_names['REFERRAL_MODE'],
	$ut_cookie_names['TIMER'],
];

function user_tracker() {
	global $ut_cookie_names;

	$request = get_request();

	$return = '
		<script type="application/javascript">
			function setCookieClientId(client_id) {
				setCookie("'. $ut_cookie_names['UNIQID'] .'", client_id, '. get_cookie_lifetime() .');
			}
			function setCookieIsoft(request) {
				setCookie("'. $ut_cookie_names['INTELLECTSOFT'] .'", request, 60);
			}
			var getRequest = "'. $request .'";
		</script>
	';

	return $return;
}
function get_cookie_lifetime() {
	return 180 * 24 * 3600;
}

function set_user_tracker() {
	global $ut_cookie_names, $cookieNames;

    # Хранилища данных
	$cookiesData = [];

    # Для совместимости с кодом MR
	$cookies = $_COOKIE;

    # Собираем данные из кук
	foreach ($cookies as $cookie_name => $cookie) {
		if (in_array($cookie_name, $cookieNames)) {
			$cookiesData[$cookie_name] = $cookie;
		}
	}

    # Пользователь не "ходит" по нашему сайту
	if(cleanReferrer(get_referer()) !== cleanReferrer($_SERVER['HTTP_HOST'])) {
        # Исходя из условий меняем значение в куках
		if (get_query_var_custom('gclid', false)) {
			$cookiesData[$ut_cookie_names['UTM_SOURCE']] = 'google';
			$cookiesData[$ut_cookie_names['UTM_MEDIUM']] = 'cpc';

			$gclid = get_query_var_custom('gclid');
			if (!empty($gclid) && (!isset($cookiesData[$ut_cookie_names['GCLID']]) || (isset($cookiesData[$ut_cookie_names['GCLID']]) && $gclid !== $cookiesData[$ut_cookie_names['GCLID']]))) {
				$cookiesData[$ut_cookie_names['GCLID']] = $gclid;
			}
		} elseif (get_query_var_custom('utm_source', false) && get_query_var_custom('utm_medium', false)) {
			$cookiesData[$ut_cookie_names['UTM_SOURCE']] = get_query_var_custom('utm_source');
			$cookiesData[$ut_cookie_names['UTM_MEDIUM']] = get_query_var_custom('utm_medium');
		} elseif (false === get_referer()) {
			$cookiesData[$ut_cookie_names['UTM_SOURCE']] = 'direct';
			$cookiesData[$ut_cookie_names['UTM_MEDIUM']] = '(none)';
		} elseif (get_referer()) {
			$cookiesData[$ut_cookie_names['UTM_MEDIUM']] = getMedium(get_referer());
			if (!isset($cookiesData[$ut_cookie_names['REFERRAL_MODE']]) || !$cookiesData[$ut_cookie_names['REFERRAL_MODE']]) {
				$cookiesData[$ut_cookie_names['UTM_SOURCE']] = cleanReferrer(get_referer());
			}
			if ($cookiesData[$ut_cookie_names['UTM_MEDIUM']] === 'referral') {
				$cookiesData[$ut_cookie_names['REFERRAL_MODE']] = true;
			}
		}

		if (get_query_var_custom('creative', false)) {
			$cookiesData[$ut_cookie_names['UTM_CONTENT']] = get_query_var_custom('creative');
		} elseif (get_query_var_custom('utm_content', false)) {
			$cookiesData[$ut_cookie_names['UTM_CONTENT']] = get_query_var_custom('utm_content');
		}

		if (get_query_var_custom('keyword', false)) {
			$cookiesData[$ut_cookie_names['UTM_TERM']] = get_query_var_custom('keyword');
		} elseif (get_query_var_custom('utm_term', false)) {
			$cookiesData[$ut_cookie_names['UTM_TERM']] = get_query_var_custom('utm_term');
		}

		if (get_query_var_custom('campaign', false)) {
			$cookiesData[$ut_cookie_names['UTM_CAMPAGAIN']] = get_query_var_custom('campaign');
		} elseif (get_query_var_custom('utm_campaign', false)) {
			$cookiesData[$ut_cookie_names['UTM_CAMPAGAIN']] = get_query_var_custom('utm_campaign');
		}

		if (get_query_var_custom('network', false)) {
			$cookiesData[$ut_cookie_names['NETWORK']] = get_query_var_custom('network');
		}

		if (get_query_var_custom('device', false)) {
			$cookiesData[$ut_cookie_names['DEVICE']] = get_query_var_custom('device');
		}

		if(!isset($cookiesData[$ut_cookie_names['LANDING_URL']])) {
			$landing_url = ($pos = strpos($_SERVER['REQUEST_URI'], '?')) ? substr($_SERVER['REQUEST_URI'], 0, $pos) : $_SERVER['REQUEST_URI'];

			$cookiesData[$ut_cookie_names['LANDING_URL']] = $landing_url;
			if($cookiesData[$ut_cookie_names['LANDING_URL']] !== '/') {
				$cookiesData[$ut_cookie_names['LANDING_URL']] = '/'. trim($cookiesData[$ut_cookie_names['LANDING_URL']], '/');
			}
			if($cookiesData[$ut_cookie_names['LANDING_URL']] === '') {
				$cookiesData[$ut_cookie_names['LANDING_URL']] = '/';
			}
		}

		if(isset($cookiesData[$ut_cookie_names['TIMER']], $cookiesData[$ut_cookie_names['MEDIUM_HISTORY']])) {
			$medium_history_arr = explode(';', $cookiesData[$ut_cookie_names['MEDIUM_HISTORY']]);
			$last_medium = end($medium_history_arr);

			if(($last_medium !== $cookiesData[$ut_cookie_names['UTM_MEDIUM']]) || ($cookiesData[$ut_cookie_names['TIMER']] > (time() + 120) && $last_medium === $cookiesData[$ut_cookie_names['UTM_MEDIUM']])) {
				$medium_history_arr[] = $cookiesData[$ut_cookie_names['UTM_MEDIUM']];

				array_splice($medium_history_arr, 25);

				$cookiesData[$ut_cookie_names['MEDIUM_HISTORY']] = implode(';', $medium_history_arr);
				$cookiesData[$ut_cookie_names['TIMER']] = time();
			}
		}
		else {
			$cookiesData[$ut_cookie_names['MEDIUM_HISTORY']] = $cookiesData[$ut_cookie_names['UTM_MEDIUM']];
			$cookiesData[$ut_cookie_names['TIMER']] = time();
		}
	}

	foreach ($cookiesData as $cName => $cValue) {
		if ($cName === $ut_cookie_names['INTELLECTSOFT']) {
			set_cookie_user_tracker($cName, $cValue, 60);
		}
		else {
			set_cookie_user_tracker($cName, $cValue);
		}
	}
}

function get_request() {
	global $ut_cookie_names;

	$request_arr['Lead_Term'] = get_cookie_user_tracker($ut_cookie_names['UTM_TERM']);
	$request_arr['Lead_Source'] = get_cookie_user_tracker($ut_cookie_names['UTM_SOURCE']);
	$request_arr['Lead_Medium'] = get_cookie_user_tracker($ut_cookie_names['UTM_MEDIUM']);
	$request_arr['Lead_Content'] = get_cookie_user_tracker($ut_cookie_names['UTM_CONTENT']);
	$request_arr['Lead_Entry_Page'] = get_cookie_user_tracker($ut_cookie_names['LANDING_URL']);
	$request_arr['Lead_Campaign'] = get_cookie_user_tracker($ut_cookie_names['UTM_CAMPAGAIN']);
	$request_arr['Lead_Network_Type'] = get_cookie_user_tracker($ut_cookie_names['NETWORK']);
	$request_arr['Lead_Device'] = get_cookie_user_tracker($ut_cookie_names['DEVICE']);
	$request_arr['GCLID'] = get_cookie_user_tracker($ut_cookie_names['GCLID']);
	$request_arr['Project_division'] = 'Intellectsoft';
	$request_arr['Mediums_History'] = get_cookie_user_tracker($ut_cookie_names['MEDIUM_HISTORY']);

	foreach($request_arr as $key => $value) {
		$v = trim($value);

		if(empty($v)) {
			unset($request_arr[$key]);
		}
	}

	$request = '';
	if(!empty($request_arr)) {
		$request_tmp = [];
		foreach($request_arr AS $name => $value) {
			$request_tmp[] = $name .'='. $value;
		}

		$request = implode('&', $request_tmp);
	}

	return $request;
}

function set_cookie_user_tracker($name, $value, $time = false) {
	if(!$time) $time = get_cookie_lifetime();
	setcookie($name, $value, time() + $time, '/', $_SERVER['HTTP_HOST']);
	$_COOKIE[$name] = $value;
}

function getMedium($referrer) {
	$searchEngines = [
		'daum','eniro','naver','google','yahoo','msn','bing','aol',
		'lycos', 'ask', 'altavista','search.netscape', 'cnn', 'about', 'mamma',
		'alltheweb', 'voila', 'search.virgilio', 'baidu', 'alice', 'yandex', 'najdi',
		'seznam', 'search', 'wp.pl', 'online.onetcenter', 'szukacz.pl', 'yam.com',
		'pchome', 'kvasir', 'sesam', 'ozu.es', 'terra', 'mynet', 'ekolay', 'rambler'
	];

	$socials = [
		't.co', 'twitter', 'adroll', 'linkedin', 'perfectaudience', 'instagram', 'facebook',
		'fb.com', 'tumblr', 'plus.google', 'pinterest', 'youtube', 'foursquare', 'dribbble',
		'flickr', 'xing', 'secret', 'medium', 'meetup', 'whatsapp', 'vine', 'mymfb', 'twoo',
		'snapchat', 'disqus', 'renren-inc', 'vk.ru', 'vk.com', 'vkontakte'
	];

	$referrer = cleanReferrer($referrer);

	foreach ($searchEngines as $engine) {
		if (strpos($referrer, $engine) !== false) {
			return 'organic';
		}
	}

	foreach ($socials as $social) {
		if (strpos($referrer, $social) !== false) {
			return 'social';
		}
	}

	return 'referral';
}

function cleanReferrer($ref) {
	$ref = str_replace(['http://', 'https://', 'www.'], '', $ref);
	$refParts = explode('/', $ref);

	return $refParts[0];
}

function get_cookie_user_tracker($name, $default = null) {
	return (isset($_COOKIE[$name]) && $_COOKIE[$name]) ? addslashes(trim($_COOKIE[$name])) : $default;
}

function get_query_var_custom($name, $default = null) {
	return (isset($_GET[$name]) && $_GET[$name]) ? addslashes(trim($_GET[$name])) : $default;
}

function get_referer() {
	$ref = false;
	if(!empty($_REQUEST['_wp_http_referer'])) {
		$ref = stripslashes($_REQUEST['_wp_http_referer']);
	}
	elseif(!empty($_SERVER['HTTP_REFERER'])) {
		$ref = stripslashes($_SERVER['HTTP_REFERER']);
	}

	if($ref && $ref !== stripslashes($_SERVER['REQUEST_URI'])) {
		return $ref;
	}
	return false;
}

function get_home_url() {
	return (((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443) ? 'https' : 'http') .'://'. $_SERVER['HTTP_HOST'];
}

set_user_tracker();

$code = user_tracker();

if(!file_exists(realpath(get_query_var_custom('l') . DIRECTORY_SEPARATOR . get_query_var_custom('page') . '.html'))) {
	header('Location: ' . get_home_url() . DIRECTORY_SEPARATOR . '404', true, 302);
}

include_once get_query_var_custom('l') . DIRECTORY_SEPARATOR . get_query_var_custom('page') .'.html';