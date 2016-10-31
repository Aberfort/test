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

	var getLink = formId + "?Lead_Source_Query=Website Query&Region=US&";
	getLink += getRequest + clientId;
	setCookieIsoft(getRequest);
	setCookieClientId(getGAClientId());

	mainForm.attr('action', getLink);
});