var mainFormRequiredMessage = $("#mainForm").data().required || 'This field is required.';

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
			First_Name: {
				required: mainFormRequiredMessage
			},
			Last_Name: {
				required: mainFormRequiredMessage
			},
			Phone: {
				required: mainFormRequiredMessage
			},
			Company: {
				required: mainFormRequiredMessage
			},
			Country: {
				required: mainFormRequiredMessage
			},
			Email: {
				required: mainFormRequiredMessage,
				email: $("#mainForm").data().email || 'Please enter a valid email address.'
			},
			Please_describe_your_project: {
				required: mainFormRequiredMessage,
			}
		},
		submitHandler: function(form) {
			// get the form data
      var clientId = '&Google_Analytics_Client_ID=' + getGAClientId();
			var formData = $('#mainForm').serialize();
			var newAction = $('#mainForm').attr('action');
      var splitCookieData = getRequest + clientId + '&' + formData;
			// process the form
			$.ajax({
				type : 'POST',
				url  : newAction,
				data : splitCookieData,
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