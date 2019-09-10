;
(function ($) {
  $(document).ready(function () {

    //Make elements equal height
    $('.matchHeight').matchHeight();

    $('.clients__slider').slick({
      centerMode: true,
      dots: true,
      centerPadding: '260px',
      slidesToShow: 1,
      speed: 500,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });

  });
}(jQuery));

const contactForms = document.body.querySelectorAll('.mobile-app-guide .contact-form');

Array.from(contactForms).forEach(form => {
  const thisForm = form.querySelector('form');

  thisForm.addEventListener('submit', e => {
    e.preventDefault();
    const successMessage = form.querySelector('.success');
    const data = new FormData(e.target);

    window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/intellectsoft-customer-experience-lab', data, {
      type: 'ContactForm',
      xhrFields: {
        withCredentials: true
      },
    }).then(response => {
          if (response.data.status) {
            dataLayer.push({'event': 'FormSubmit'});

            thisForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
          }
        }
    ).catch(error => {
      console.error(error);
    })
  });
});
