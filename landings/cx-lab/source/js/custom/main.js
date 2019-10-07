;
(function ($) {
  $(document).ready(function () {

    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      $('.header__button .contact-btn').addClass('is-safari');
    }


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
          if ($(window).width() > 991) {
            $(this).addClass('visible');
          }
        }
      });

    });

    var a = 0;
    $(window).scroll(function () {

      var oTop = $('#counter').offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function () {
          var $this = $(this),
              countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
                countNum: countTo
              },

              {

                duration: 2000,
                easing: 'swing',
                step: function () {
                  $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                  $this.text(this.countNum);
                  //alert('finished');
                }

              });
        });
        a = 1;
      }

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

    $('.next-click').click(function () {
      $('.clients__slider').slick('slickNext');
    });

    $('.prev-click').click(function () {
      $('.clients__slider').slick('slickPrev');
    });

    $("body").on("click", ".contact-btn", function (event) {
      event.preventDefault();
      let id = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
    });

    $('.count').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });


    $("form").submit(function(){
      var isFormValid = true;

      $(".required input, .required select").each(function(){
        if ($.trim($(this).val()).length == 0){
          $(this).parent().addClass("has-error");
          isFormValid = false;
        }
        else{
          $(this).parent().removeClass("has-error").addClass("has-success");
        }
      });

      return isFormValid;
    });

    $('.required input, .required select').blur(function()
    {
      if( !$(this).val() ) {
        $(this).parent().addClass('has-error');
      } else {
        $(this).parent().removeClass("has-error").addClass("has-success");
      }
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
