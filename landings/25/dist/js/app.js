'use strict';

var contactForms = document.body.querySelectorAll('.tech-workshops .contact-form');

Array.from(contactForms).forEach(function (form) {
    var thisForm = form.querySelector('form');
    var inputs = thisForm.querySelectorAll('input');

    Array.from(inputs).forEach(function (input) {
        input.addEventListener('keyup', function (e) {
            if (e.target.value !== '') {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        });
    });

    thisForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var successMessage = form.querySelector('.success');
        var data = new FormData(e.target);

        window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/mobile-app-guide', data, {
            type: 'ContactForm'
        }).then(function (response) {
            if (response.data.status) {
                dataLayer.push({ 'event': 'FormSubmit' });

                thisForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }
        }).catch(function (error) {
            console.error(error);
        });
    });
});