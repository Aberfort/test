'use strict';

var handleFormSubmit = window.handleFormSubmit; // We got it from traccoon project.
var notifyDelay = 10000;

$('.reg-link').click(function () {
    $('#container-reg').css("display", "flex").hide().fadeIn(500);
    $('#page').fadeOut(200);
});

$('.form-block__link').click(function () {
    $('#page').fadeIn(500);
    $('#container-reg').fadeOut(200);
});

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value);
};

var hide = function hide(elem) {
    return elem.style.display = 'none';
};
var show = function show(elem) {
    return elem.style.display = 'block';
};

$('form').each(function () {
    $(this).validate({
        showErrors: function showErrors(errorMap, errorList) {
            if (errorMap['attach']) Notify(uploadErrorMessage, notifyDelay);
            this.defaultShowErrors();
        },
        rules: {
            name: {
                required: true,
                maxlength: 255
            },
            last_name: {
                required: true,
                maxlength: 255
            },
            position: {
                required: true,
                maxlength: 255
            },
            company: {
                required: true,
                maxlength: 255
            },
            email: {
                required: true,
                email: true,
                maxlength: 255
            },
            phone: {
                required: false,
                number: true,
                maxlength: 255,
                minlength: 5
            },
            description: {
                required: false,
                maxlength: 65535
            }
        },
        messages: {
            email: {
                email: 'Please enter a valid email address.'
            }
        },
        submitHandler: function submitHandler(form, event) {
            event.preventDefault();
            var rowData = new FormData(form);
            var url = form.getAttribute('data-url');
            var contactErrorMessage = form.querySelector('.registration__error');
            var thxMessage = form.nextElementSibling;
            rowData.append('handler_id', form.dataset.handler);

            handleFormSubmit(url, rowData, {
                type: form.dataset.type
            }).then(function (res) {
                if (res.data.status) {
                    hide(form);
                    show(thxMessage);
                } else {
                    contactErrorMessage.textContent = 'Check selected fields, please.';
                    show(contactErrorMessage);
                }

                if (Object.keys(res.data).length > 1) {
                    Object.keys(res.data).map(function (error) {
                        var inputName = error.split('-')[1];
                        var input = document.querySelector('[name=' + inputName + ']');

                        return input.classList.add('has-error');
                    });
                }
            }).catch(function (error) {
                show(contactErrorMessage);
                console.log(error);
            });
        }
    });
});

function Notify() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Default message';
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

    var existingNotify = document.querySelector('.notify');
    var wrapper = document.createElement('div');
    var textNode = document.createTextNode(message);
    var body = document.body;

    if (existingNotify) body.removeChild(existingNotify);

    wrapper.classList.add('notify');
    wrapper.addEventListener('click', function (e) {
        return e.target.style.opacity = 0;
    });
    wrapper.appendChild(textNode);

    setTimeout(function () {
        wrapper.style.opacity = 1;
        wrapper.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(function () {
        wrapper.style.opacity = 0;
        wrapper.style.transform = 'translateY(200%)';
    }, delay);

    return body.appendChild(wrapper);
}