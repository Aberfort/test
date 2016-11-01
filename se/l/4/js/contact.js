function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie (c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  }
  else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = decodeURIComponent(c_value.substring(c_start, c_end));
  }
  return c_value;
}

// handle Google Analytics/AdWords cookies info
$(window).load(function () {

	var mainForm = $('#mainForm');

	var formId = $('form').attr('action');

  function getGAClientId() {
        try {
            var tracker = ga.getAll()[0];
            return tracker.get('clientId');
        } catch(e) {
            console.log("Client ID Not Found");
            return '';
        }
    }

	var clientId = '&Google_Analytics_Client_ID=' + getGAClientId();


    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    var getLink = formId + "?Lead_Source_Query=Website Query&Region=SE&",
        getSearch = window.location.search,
        getWinLoc = encodeURIComponent(window.location.origin + window.location.pathname),
        getRef = encodeURIComponent(document.referrer),
        searchEngine,
        getRequest ='',
        utmArray = {},
        getRefferer,
        tmp;

    if(document.referrer) {
        getRefferer = document.referrer.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i)[1];
    }
    searchEngine  = /www.bing./ig.test(document.referrer) ? 'bing' : (/www.google./ig.test(document.referrer) ? 'google' : getRefferer);

    if(getCookie('intellectsoft')) {
        getRequest = getCookie('intellectsoft');
    }
    else {
        if(getSearch != '') {
            tmp = (getSearch.substr(1)).split('&');
            tmp.forEach(function(raw) {
                if (!raw) {
                    return true;
                }
                raw = raw.split('=');
                var name = raw[0].trim(), val;
                try {
                    val = raw[1];
                } catch (e) {
                    val = raw[1];
                }
                val = val.trim();
                utmArray[name] = encodeURIComponent(val);
            });
            if(!!utmArray.keyword) {
                getRequest = 'Lead_Term='+utmArray.keyword+'&Lead_Source='+searchEngine+'&Lead_Referrer='+getRef+'&Lead_Medium=cpc&Lead_Entry_Page='+getWinLoc+'&Lead_Content=(none)&Lead_Campaign='+(utmArray.campaign ? utmArray.campaign : '(none)');
            }
            else if(!!utmArray.utm_source && utmArray.utm_source == 'bing') {
                getRequest = 'Lead_Term='+(utmArray.utm_term ? utmArray.utm_term : '(none)' )+'&Lead_Source='+utmArray.utm_source+'&Lead_Referrer='+utmArray.utm_source+'&Lead_Medium='+utmArray.utm_medium+'&Lead_Entry_Page='+getWinLoc+'&Lead_Content='+(utmArray.utm_content ? utmArray.utm_content : '(none)')+'&Lead_Campaign='+ (utmArray.utm_campaign ? utmArray.utm_campaign : '(none)');
            }
            else if(!!utmArray.utm_source) {
                getRequest = 'Lead_Term='+(utmArray.utm_term ? utmArray.utm_term : '(none)' )+'&Lead_Source='+utmArray.utm_source+'&Lead_Referrer='+getRef+'&Lead_Medium=referral&Lead_Entry_Page='+getWinLoc+'&Lead_Content='+(utmArray.utm_content ? utmArray.utm_content : '(none)')+'&Lead_Campaign='+ (utmArray.utm_campaign ? utmArray.utm_campaign : '(none)');
            }
        }
        else if(!!document.referrer){
            getRequest = 'Lead_Term=(none)&Lead_Source='+searchEngine+'&Lead_Referrer='+getRef+'&Lead_Entry_Page='+getWinLoc+'&Lead_Medium=organic&Lead_Content=(none)&Lead_Campaign=(none)';
        }
        else {
            getRequest = 'Lead_Term=(none)&Lead_Source=(none)&Lead_Referrer=(none)&Lead_Entry_Page='+getWinLoc+'&Lead_Medium=direct&Lead_Content=(none)&Lead_Campaign=(none)';
        }
        setCookie('intellectsoft',getRequest,60);
    }

    getLink += getRequest + clientId;
    mainForm.attr('action', getLink);


});