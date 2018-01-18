function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var form = document.querySelector('.form-wrapper');
var submitButton = $('#submit');
var formArray = form.querySelectorAll('.required-input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    var isValid = true;
    var itemsValues = {};
    [].forEach.call(formArray, function(item) {
        if(!item.value) {
            item.classList.add('has-error');
            isValid = false;
        } else {
            if(item.getAttribute('type') === 'email'){
                if(!validateEmail(item.value)){
                    item.classList.add('has-error');
                    isValid = false;
                }
            }
            item.classList.remove('has-error');
            itemsValues[item.getAttribute('name')] = item.value;
        }
    })

    if(isValid) {
        var settings = {
            'async': true,
            'url': '//dev-traccoon.isdev.info/forms/intellectsoft/kado-solution',
            'method': 'POST'
        };
        settings['data'] = itemsValues;

        $.ajax(settings)
            .done(function() {
                $(form).hide();
                submitButton.addClass('ga-registration-success');
                $('.form-block__complete').show();
            })
            .error(function (err) {
                console.log('err');
                console.log(err);
                submitButton.addClass('ga-registration-error');
            });
    }
});