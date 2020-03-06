$(document).ready(function () {

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  };

  var kw = getUrlParameter('kw');
  var location = getUrlParameter('location');

  if ((kw) && (location)) {
    $('.kw').append(kw + ' in ' + location);
  } else if (kw) {
    $('.kw').append(kw);
  } else if (location) {
    $('.kw').append('Mobile App Development Company in ' + location);
  } else {
    $('.kw').append('Mobile App Development Company');
  }

  $('meta[name=description]').remove();
  $('head').append('<meta name="description" content="Quickly build the team you need with our ' + kw + ' in ' + location + '. Employ the best app developers for your mobile app now.">');

  document.title = kw + ' | Intellectsoft US';

  "use strict";

  /*----------------------------------------------------*/
  /*	Video Background
   /*----------------------------------------------------*/

  $('.video-play').vide("/static/7/images/video/video", {
    posterType: "jpg",
    className: 'video-container'
  });

});

// Clients section
$('.clients__container').owlCarousel({
  loop: true,
  dots: false,
  nav: true,
  navText: ["", ""],
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  margin: 10,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2,
      autoWidth: true
    },
    1020: {
      items: 3,
      autoWidth: true
    },
    1280: {
      items: 4
    }
  }
});

// Awards section
$('.about__awards').owlCarousel({
  loop: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: true,
  navText: ["", ""],
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 3
    },
    1250: {
      items: 4
    }
  }
});

AOS.init();

function Notify(message = 'Default message', delay = 3000) {
  const existingNotify = document.querySelector('.notify')
  const wrapper = document.createElement('div')
  const textNode = document.createTextNode(message)
  const body = document.body

  if (existingNotify) body.removeChild(existingNotify)

  wrapper.classList.add('notify')
  wrapper.addEventListener('click', e => (e.target.style.opacity = 0))
  wrapper.appendChild(textNode)

  setTimeout(() => {
    wrapper.style.opacity = 1
    wrapper.style.transform = 'translateY(0)'
  }, 300)

  setTimeout(() => {
    wrapper.style.opacity = 0
    wrapper.style.transform = 'translateY(200%)'
  }, delay)

  return body.appendChild(wrapper)
}

const newsletter = document.querySelector('.newsletter')
const newsletterOk = document.querySelectorAll('.popup-ok')
const docHeight = document.querySelector('body').offsetHeight
const triggerHeight = docHeight * 0.75 - window.innerHeight
const newsLetterKey = 'isNewsletter'
const twoWeeks = 7 * 24 * 60 * 60 * 1000 * 2
const dateNow = Date.now()
const newsLetterShown = {
  date: dateNow + twoWeeks,
  shown: true
}


function showNewsletterPopup() {
  const isNewsLetter = JSON.parse(localStorage.getItem(newsLetterKey))
  if (!isNewsLetter || isNewsLetter.date < dateNow) {
    return newsletter && newsletter.classList.add('newsletter--show')
  }
}

newsletterOk &&
[].forEach.call(newsletterOk, item => {
  item.addEventListener('click', () => {
    newsletter.classList.remove('newsletter--show')
    localStorage.setItem(newsLetterKey, JSON.stringify(newsLetterShown))
  })
})

window.addEventListener('scroll', () => {
  const scrollHeight = window.scrollY
  scrollHeight > triggerHeight ? showNewsletterPopup() : ''
})

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});

if ($('.footer__year').length) {
  const currentYear = (new Date()).getFullYear()
  $('.footer__year').text(currentYear);
}

if ($('html[lang="no"]').length) {
  $('.work__cta').addClass('work__cta--no');
  $('.work__cta-title').addClass('work__cta-title--no');
  $('.competence__content').addClass('competence__content--no');
}

// Ranking widget carousel initialization
const owl = $('#ranking');
const form = $('#formRanking');

fillInOwlInit(owl, '.ranking', true, 4, 4, 7, 10, '0, 110, 250', 5, false, false, false, true, 2000, false, 5);
fillInOwlInit(form, '.ranking-form', false, 4, 2, 3, 6, '255, 255, 255', 10, true, false, false, true, 2000, true, 9);

function fillInOwlInit(
    owl,
    sliderContainer,
    autoplay,
    items,
    itemsMobile,
    itemsTablet,
    speed,
    color,
    margin,
    form,
    nav,
    loop,
    dot,
    autoplayTimeoutMobile,
    dotMobile,
) {
  let dots,
      width = 0,
      opacity = 1,
      widthAnim = []

  if (owl.length > 0) {
    owl.owlCarousel({
      loop: loop,
      lazyLoad: true,
      margin: margin,
      nav: nav,
      items: items,
      dots: dot,
      autoplay: autoplay,
      autoplayTimeout: 7000,
      autoplaySpeed: 2000,
      smartSpeed: 600,
      onInitialized: owlInitFunction,
      onChange: owlChangedFunction,
      onChanged: owlInitFunction,
      responsive: {
        0: {
          items: form ? 2 : 1,
          margin: 0,
          dots: dotMobile,
          nav: false,
          loop: true,
          autoplay: false,
          autoplayTimeout: autoplayTimeoutMobile,
        },
        600: {
          items: form ? itemsTablet : itemsMobile,
          margin: form ? 25 : margin
        },
        1000: {
          items: itemsTablet,
          margin: form ? 25 : margin
        }
      }
    })
  }

  function owlInitFunction() {
    dots = $(`${sliderContainer} .owl-dot`)
    if (dots.length && !nav) {
      step()
    }
  }

  function owlChangedFunction(prop) {
    if (prop.property.name === 'position') {
      width = 50
    }
    dots.find('span').removeAttr('style')
    width = 0
    opacity = 1
  }

  function step() {
    var increment = 50 / (speed * 60)
    var decrement = 1 / (speed * 60)
    width += increment
    opacity -= decrement
    $(dots[getPrevItem()]).find('span').css({
      'border-color': `rgba(${color}, ${opacity})`
    })
    if (window.innerWidth <= 599) {
      $(dots[getNextItem()]).find('span').css({
        'border-left': `solid ${width / 2}px rgba(${color}, 1)`
      })
    } else {
      $(dots[getNextItem()]).find('span').css({
        'border-left': `solid ${width}px rgba(${color}, 1)`
      })
    }

    if (width < 50) {
      widthAnim.push(requestAnimationFrame(step))
    } else {
      resetStyles()
      dots[getNextItem()].click()
    }
  }

  function resetStyles() {
    width = 0
    opacity = 1
    $(dots[getPrevItem()]).find('span').removeAttr('style')
    $(dots[getNextItem()]).find('span').css({
      'border-left': ''
    })
    dots.one('click', () => {
      widthAnim.forEach(item => {
        cancelAnimationFrame(item)
      })
      widthAnim = []
    })
  }

  function getNextItem() {
    var nextItemIndex = 0
    $.each(dots, function (index, item) {
      if ($(item).hasClass('active') && index < dots.length - 1) {
        nextItemIndex = index + 1
        return
      }
    })
    return nextItemIndex
  }

  function getPrevItem() {
    var prevItem = dots.length - 1
    $.each(dots, function (index, item) {
      if ($(item).hasClass('active') && index < dots.length - 1) {
        prevItem = index
        return
      }
    })
    return prevItem
  }
}


$.validator.methods.number = function (value, element) {
  return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}

const hide = elem => elem.style.display = 'none'

$('form').each(function () {
  $(this).validate({
    showErrors: function (errorMap, errorList) {
      if (errorMap['attach']) Notify(uploadErrorMessage, notifyDelay)
      this.defaultShowErrors()
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
    submitHandler: function (form, event) {
      event.preventDefault()
      const rowData = new FormData(form)
      const url = form.getAttribute('data-url')
      const contactErrorMessage = form.querySelector('.registration__error')
      const thxMessage = form.nextElementSibling
      rowData.append('handler_id', form.dataset.handler)

      handleFormSubmit(url, rowData, {
        type: form.dataset.type
      })
          .then(res => {
            if (res.data.status) {
              $('.notification').show();
              $("form").trigger("reset");
            } else {
              contactErrorMessage.textContent = 'Check selected fields, please.'
              show(contactErrorMessage)
            }

            if (Object.keys(res.data).length > 1) {
              Object.keys(res.data).map(error => {
                const inputName = error.split('-')[1]
                const input = document.querySelector(`[name=${inputName}]`)

                return input.classList.add('has-error')
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
  })
})