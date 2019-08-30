const contactForms = document.body.querySelectorAll('.mobile-app-guide .contact-form');

Array.from(contactForms).forEach(form => {
  const thisForm = form.querySelector('form');

  thisForm.addEventListener('submit', e => {
    e.preventDefault();
    const successMessage = form.querySelector('.success');
    const data = new FormData(e.target);

    window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/digital-transformation-tech-guide', data, {
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


$(document).ready(function () {
  AOS.init();

  $(".main-header").on("click", ".main-btn", function (event) {
    event.preventDefault();
    let id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });

  $('.footer__menu .has-dropdown').on('click', function () {
    let height = $(this).find('.sub-menu').outerHeight();
    $(this).toggleClass('arrow-down');
    $('.arrow-down .toggle-menu').slideToggle('slow');
  });

  $('.footer__menu .has-dropdown').click(function (e) {
    e.preventDefault();

    var $this = $(this).find('.sub-menu');

    if ($this.hasClass('show')) {
      $this.removeClass('show');
      $this.slideUp(350);
    } else {
      $this.parent().find('.sub-menu').removeClass('show');
      $this.parent().find('.sub-menu').slideUp(350);
      $this.toggleClass('show');
      $this.slideToggle(350);
    }
  });
});


// load particles

particlesJS("particles",
    {
      "particles": {
        "number": {
          "value": 80, "density": {
            "enable": true, "value_area": 800
          }
        },
        "color":
            {"value": "#12ffff"},
        "shape":
            {
              "type": "circle",
              "stroke":
                  {
                    "width": 0, "color": "#000000"
                  },
              "polygon":
                  {
                    "nb_sides": 5
                  },
              "image": {"src": "img/github.svg", "width": 100, "height": 100}
            },
        "opacity": {
          "value": 1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 4,
          "random": true,
          "anim": {"enable": false, "speed": 40, "size_min": 0.1, "sync": false}
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.2,
          "width": 1.5
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {"enable": false, "mode": "repulse"},
          "onclick": {"enable": false, "mode": "push"},
          "resize": true
        },
        "modes": {
          "grab": {"distance": 400, "line_linked": {"opacity": 1}},
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {"distance": 200, "duration": 0.4},
          "push": {"particles_nb": 4},
          "remove": {"particles_nb": 2}
        }
      },
      "retina_detect": true
    });
