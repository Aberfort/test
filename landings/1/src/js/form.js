var getHost = location.host;
var getRegion = getHost.match(/.net/) && getHost.match(/.net/).join() ? 'US' : 'UK';
var formURL = location.origin + location.pathname;

var cookieData = [
	'&GCLID=' + Cookies.get('is_gclid'),
	'&Lead_Campaign=' + Cookies.get('is_utm_campaign'),
	'&Lead_Source=' + Cookies.get('is_utm_source'),
	'&Lead_Medium=' + Cookies.get('is_utm_medium'),
	'&Lead_Term=' + Cookies.get('is_utm_term'),
	'&Lead_Content=' + Cookies.get('is_utm_content'),
	'&Lead_Network_Type=' + Cookies.get('is_network'),
	'&Lead_Device=' + Cookies.get('is_device'),
	'&Lead_Entry_Page=' + Cookies.get('is_landing_url'),
	'&Mediums_History=' + Cookies.get('is_medium_history'),
	'&Lead_Referrer=' + Cookies.get('is_referrer'),
	'&Lead_Source_Query=Website Query',
	'&Region=' + getRegion,
	'&Project_division=intellectsoft',
	'&form_url=' + formURL,
];

window.addEventListener('load', function () {
	cookieData.push('&Google_Analytics_Client_ID=' + Cookies.get('is_uniqid'))
	console.log('Google GA Loaded')
});


$("#mainForm").validate({
		rules: {
			First_Name: {
				required: true
			},
			Last_Name: {
				required: true
			},
			Phone: {
				required: true
			},
			Company: {
				required: true
			},
			Country: {
				required: true
			},
			Email: {
				required: true,
				email: true
			},
			Please_describe_your_project: {
				required: true,
				maxlength: 65000
			},
		},
		messages: {
			Email: {
				email: "Please enter a valid email address."
			}
		},
		submitHandler: function(form) {
			// get the form data
			var preparedCookie = cookieData.join('');
			var formData = $('#mainForm').serialize() + preparedCookie;
			var newAction = $('#mainForm').attr('action');
			// process the form
			$.ajax({
				type : 'POST',
				url  : newAction,
				data : formData,
				dataType : 'json',
				encode : true
			}).done(function (data) {
				if (!data.success) {
					console.log('fail')
				}
				console.log(data);
			});

			$('#mainForm').hide();
			$('.contact__complete').show();
			$('input,textarea').val('');

			dataLayer.push({
			  'form': 'mainForm',
			  'event': 'formSubmit'
			});
		}
	});