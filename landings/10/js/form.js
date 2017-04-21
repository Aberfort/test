var ebookForm = document.querySelector('#ebook');
var getRegion = ebookForm.getAttribute('data-region');
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
});

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value);
};

$("#ebook").validate({
    rules: {
        First_Name: {
            required: true,
            maxlength: 255
        },
        Company: {
            required: true,
            maxlength: 255
        },
        Email: {
            required: true,
            email: true,
            maxlength: 255
        },
        I_am_interested_in: {
            required: true
        }
    },
    submitHandler: function (form) {
        // get the form data
        var preparedCookie = cookieData.join('');
        var formData = $(form).serialize() + preparedCookie;
        var newAction = $(form).attr('action');

        // process the form
        $.ajax({
            type: 'POST',
            url: newAction,
            data: formData,
            dataType: 'json',
            encode: true
        });

        $('.form-box').hide();
        $('.contact-form-msg').show();

        dataLayer.push({
            'form': 'mainForm',
            'event': 'Ebook'
        });
    }
});