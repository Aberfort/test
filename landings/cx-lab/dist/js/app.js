'use strict';

;
(function ($) {
  $(document).ready(function () {

    //Make elements equal height
    $('.matchHeight').matchHeight();
  });
})(jQuery);

var contactForms = document.body.querySelectorAll('.mobile-app-guide .contact-form');

Array.from(contactForms).forEach(function (form) {
  var thisForm = form.querySelector('form');

  thisForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var successMessage = form.querySelector('.success');
    var data = new FormData(e.target);

    window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/intellectsoft-customer-experience-lab', data, {
      type: 'ContactForm',
      xhrFields: {
        withCredentials: true
      }
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