'use strict';

var contactForms = document.querySelectorAll('.contact-form');

Array.from(contactForms).forEach(function (form) {
    var thisForm = form.querySelector('form');

    thisForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var successMessage = form.querySelector('.success');
        var data = new FormData(e.target);
        var url = e.target.dataset.url;


        window.handleFormSubmit(url, data, {
            type: 'ContactForm'
        }).then(function (response) {
            if (response.data.status) {
                thisForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }
        }).catch(function (error) {
            console.error(error);
        });
    });
});