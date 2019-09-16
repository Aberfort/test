'use strict';

;
(function ($) {
  $(document).ready(function () {

    AOS.init();

    //Make elements equal height
    $('.matchHeight').matchHeight();

    $('.clients__slider').slick({
      centerMode: true,
      arrows: false,
      dots: true,
      centerPadding: '50px',
      slidesToShow: 1,
      speed: 800,
      variableWidth: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }]
    });

    $('.next-click').click(function () {
      $('.clients__slider').slick('slickNext');
    });

    $('.prev-click').click(function () {
      $('.clients__slider').slick('slickPrev');
    });

    $("body").on("click", ".contact-btn", function (event) {
      event.preventDefault();
      var id = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({ scrollTop: top }, 1500);
    });
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