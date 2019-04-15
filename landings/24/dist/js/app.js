'use strict';

var contactForms = document.body.querySelectorAll('.mobile-app-guide .contact-form');

Array.from(contactForms).forEach(function (form) {
    var thisForm = form.querySelector('form');

    thisForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var successMessage = form.querySelector('.success');
        var data = new FormData(e.target);

        window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/how-to-create-a-mobile-app-guide', data, {
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