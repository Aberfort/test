$(document).ready(function () {

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
        'border-left': `solid ${width/2}px rgba(${color}, 1)`
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
    $.each(dots, function(index, item) {
      if ($(item).hasClass('active') && index < dots.length - 1) {
        nextItemIndex = index + 1
        return
      }
    })
    return nextItemIndex
  }

  function getPrevItem() {
    var prevItem = dots.length - 1
    $.each(dots, function(index, item) {
      if ($(item).hasClass('active') && index < dots.length - 1) {
        prevItem = index
        return
      }
    })
    return prevItem
  }
}

//const handleFormSubmit = window.handleFormSubmit // We got it from traccoon project.
const isoft = 'isoft'
const clearDelay = 900000 // 15 minutes
const ndaCheckbox = document.querySelector('#send_nda')

const formWrap = document.querySelector('.form-wrap')
const formWrapBackground = formWrap && window
    .getComputedStyle(formWrap)
    .getPropertyValue('background-image')
const thxMessages = [].slice.apply(document.querySelectorAll('.js-thx')) // Hack for Edge and IE11
const uploadErrorMessage = 'You can upload doc, docx, pdf, odt, ott, txt files under 25mb.'
const notifyDelay = 10000;


function Notify (message = 'Default message', delay = 3000) {
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

formWrapBackground !== 'none'
    ? thxMessages.forEach(e => e.classList.add('text-white'))
    : null

if (ndaCheckbox) {
  ndaCheckbox.addEventListener('click', e => {
    e.target.value === '1'
        ? (e.target.value = '0')
        : (e.target.value = '1')
  })
}

$.validator.methods.number = function (value, element) {
  return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}
$.validator.addMethod('filesize', function (value, element, param) {
  // param = size (in bytes)
  return this.optional(element) || element.files[0].size <= param
})

const hide = elem => elem ? elem.style.display = 'none' : null
const show = elem => elem ? elem.style.display = 'block' : null

$('form').each(function () {
  $(this).validate({
    errorClass: 'has-error',
    validClass: 'has-success',
    showErrors: function (errorMap, errorList) {
      if (errorMap['attach']) Notify(uploadErrorMessage, notifyDelay)
      this.defaultShowErrors()
    },
    highlight: function (elem, errorClass, validClass) {
      $(elem)
          .parent()
          .addClass(errorClass)
          .removeClass(validClass)
    },
    unhighlight: function (elem, errorClass, validClass) {
      $(elem)
          .parent()
          .removeClass(errorClass)
          .addClass(validClass)
    },
    rules: {
      name: {
        required: false,
        maxlength: 255
      },
      last_name: {
        required: true,
        maxlength: 255
      },
      phone: {
        required: true,
        number: true,
        maxlength: 255,
        minlength: 5
      },
      company: {
        required: true,
        maxlength: 255
      },
      position: {
        required: true,
        maxlength: 255
      },
      country: {
        required: true
      },
      size: {
        required: true
      },
      email: {
        required: {
          depends: function() {
            $(this).val($.trim($(this).val()));
            return true;
          }
        },
        email: true,
        maxlength: 255
      },
      description: {
        required: true,
        maxlength: 65535
      },
      attach: {
        extension: 'doc|docx|pdf|odt|ott|txt',
        filesize: 25 * 1000 * 1000
      }
    },
    messages: {
      email: {
        email: 'Please enter a valid email address.'
      },
      attach: {
        filesize: 'File should be less than 25mb'
      }
    },
    submitHandler: function (form) {
      const fileInput = form.querySelector('#attach');
      if (fileInput && fileInput.files.length === 0) {
        fileInput.remove();
      }

      const rowData = new FormData(form)
      const url = form.getAttribute('data-url')
      const contactErrorMessage = form.querySelector('.contact__error')
      const thxMessage = form.nextElementSibling
      const spinner = form.querySelector('.form-spinner')
      const submitButton = form.querySelector('.form__submit')

      rowData.append('handler_id', form.dataset.handler)
      if (spinner) spinner.classList.add('js-show')

      if (form.getAttribute('id') === 'form-contacts') {
        hide(submitButton)
        if(isLocalStorageAvailable()){
          localStorage.setItem(
              isoft,
              JSON.stringify({time: new Date().getTime()})
          )
        }
      }

      window.handleFormSubmit(url, rowData, {
        type: form.dataset.type
      })
          .then(res => {
            if (res.data.status) {
              hide(form)
              show(thxMessage)
              if ($("#pined-form-main-tokenization")[0]) {
                window.dataLayer.push({'event': 'RegisterFormSubmit'})
              }
            } else if (Object.keys(res.data).length >= 1) {
              Object.keys(res.data).map(error => {
                const inputName = error.split('-')[1]
                const inputElm = document.querySelector(`[name=${inputName}]`)
                const input = inputElm ? inputElm.parentElement : null
                if (input) {
                  input.classList.remove('has-success')
                  input.classList.add('has-error')
                }
              })
            } else {
              contactErrorMessage.textContent = 'Check selected fields, please.'
              show(contactErrorMessage)
            }

            if (spinner) spinner.classList.remove('js-show')
            show(submitButton)
          })
          .catch(error => {
            show(contactErrorMessage)
            show(submitButton)
            if (spinner) spinner.classList.remove('js-show')
            console.log(error)
          })
    }
  })
});

function checkStorage (key, delay) {
  const currentTime = new Date().getTime()
  const userTime = checkKeyInStorage(key) ? checkKeyInStorage(key).time : null
  const ttl = userTime && userTime + delay - currentTime

  if (ttl <= 0) {
    if (isLocalStorageAvailable()){
      localStorage.removeItem(key)
    }
    showMessageIfWeKnowUser(key)
  }
}

function checkKeyInStorage (elem) {
  if (isLocalStorageAvailable()){
    return JSON.parse(localStorage.getItem(elem))
  }
}

function hideFormTitle () {
  const title = document.querySelector('#formBottom')
  if (checkKeyInStorage(isoft) && title) title.style.display = 'none'
}

function showMessageIfWeKnowUser (elem) {
  const message = document.querySelector('.thank')
  const form = document.querySelector('#form-contacts')
  if (!checkKeyInStorage(elem)) {
    message ? (message.style.display = 'none') : ''
    form ? (form.style.display = 'flex') : ''
  }
}

checkStorage(isoft, clearDelay)
hideFormTitle()

const fileInput = document.querySelector('input[type=file]')
const clearAttach = document.querySelector('.clear-attach')

fileInput &&
fileInput.addEventListener('change', e => {
  let fileName = e.target.value.split('\\').pop()
  const label = e.target.parentElement.querySelector('.upload__label')
  const maxLength = 15

  if (fileName.length >= maxLength) {
    fileName = `${fileName.slice(0, 5)}...${fileName.slice(-5)}`
  }

  fileName
      ? (label.querySelector('span').innerHTML = fileName)
      : (label.querySelector('span').innerHTML = e.target.dataset.label)

  clearAttach.style.display = 'block'
})

clearAttach && clearAttach.addEventListener('click', e => {
  e.preventDefault()
  fileInput.value = ''
  const defaultLabel = document.querySelector('.uploaded__text')
  defaultLabel.innerHTML = `<i class="isoi-paper-clip"></i>Attach file`
  clearAttach.style.display = 'none'
})

//TODO: incapsulate work with localstorage to avoid errors
function isLocalStorageAvailable(){
  try{
    window.localStorage;
  }catch(err){
    return false;
  }
  return true;
}

const clearStorage = document.querySelector('#clearStorage')

clearStorage &&
clearStorage.addEventListener('click', e => {
  e.preventDefault()
  if(isLocalStorageAvailable()) {
    localStorage.clear()
  }
  location.reload()
});

(function () {
  window.onload = function() {
    checkAdBlock();
  };

  function checkAdBlock() {
    let fieldAdBlock = document.querySelector('.check-browse');

    if (fieldAdBlock) {
      if (window.checkBrowse === true) {
        fieldAdBlock.value = 0;
      }
      else {
        fieldAdBlock.value = 1;
      }
    }
  }
})();
