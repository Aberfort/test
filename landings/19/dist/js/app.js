'use strict';

var handleFormSubmit = window.handleFormSubmit; // We got it from traccoon project.
var notifyDelay = 10000;

var owl = $('.owl-carousel');
owl.owlCarousel({
    stagePadding: 40,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 20,
    responsive: {
        0: {
            items: 1
        },
        550: {
            items: 2
        },
        900: {
            items: 3
        },
        1250: {
            items: 4
        }
    }
});

$('.owl-item').click(function () {
    owl.trigger('next.owl.carousel');
});

AOS.init();

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value);
};

var hide = function hide(elem) {
    return elem.style.display = 'none';
};
// const show = elem => elem.style.display = 'block'

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
                required: true,
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
                    $('.notification').show();
                    $("form").trigger("reset");
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

var newsletter = document.querySelector('.newsletter');
var newsletterOk = document.querySelectorAll('.popup-ok');
var docHeight = document.querySelector('body').offsetHeight;
var triggerHeight = docHeight * 0.75 - window.innerHeight;
var newsLetterKey = 'isNewsletter';
var twoWeeks = 7 * 24 * 60 * 60 * 1000 * 2;
var dateNow = Date.now();
var newsLetterShown = {
    date: dateNow + twoWeeks,
    shown: true
};

function showNewsletterPopup() {
    var isNewsLetter = JSON.parse(localStorage.getItem(newsLetterKey));
    if (!isNewsLetter || isNewsLetter.date < dateNow) {
        return newsletter && newsletter.classList.add('newsletter--show');
    }
}

newsletterOk && [].forEach.call(newsletterOk, function (item) {
    item.addEventListener('click', function () {
        newsletter.classList.remove('newsletter--show');
        localStorage.setItem(newsLetterKey, JSON.stringify(newsLetterShown));
    });
});

window.addEventListener('scroll', function () {
    var scrollHeight = window.scrollY;
    scrollHeight > triggerHeight ? showNewsletterPopup() : '';
});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});