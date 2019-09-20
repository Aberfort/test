;
(function ($) {
  $(document).ready(function () {

    AOS.init();

    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(window).scroll(function () {
      $('.about__design').each(function () {
        if (isScrolledIntoView(this) === true) {
          $(this).addClass('visible');
        } else {
          $(this).removeClass('visible');
        }
      });

    });


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
      infinite: true,
      adaptiveHeight: true,
      lazyLoad: 'ondemand',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: false,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
      ]
    });

    $('.next-click').click(function(){
      $( '.clients__slider' ).slick('slickNext');
    });

    $('.prev-click').click(function(){
      $( '.clients__slider' ).slick('slickPrev');
    });

    $("body").on("click", ".contact-btn", function (event) {
      event.preventDefault();
      let id = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
    });

  });
}(jQuery));

const contactForms = document.body.querySelectorAll('.about .contact-form');

Array.from(contactForms).forEach(form => {
  const thisForm = form.querySelector('form');

  thisForm.addEventListener('submit', e => {
    e.preventDefault();
    const successMessage = form.querySelector('.success');
    const data = new FormData(e.target);

    window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/cx/contacts', data, {
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
