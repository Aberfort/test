const handleFormSubmit = window.handleFormSubmit // We got it from traccoon project.
const notifyDelay = 10000

const owl = $('.owl-carousel');
owl.owlCarousel({
    stagePadding: 40,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 20,
    responsive:{
        0:{
            items:1
        },
        550:{
            items:2
        },
        900: {
            items:3
        },
        1250:{
            items:4
        }
    }
});

$('.owl-item').click(function() {
    owl.trigger('next.owl.carousel');
});

AOS.init();

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}

const hide = elem => elem.style.display = 'none'
// const show = elem => elem.style.display = 'block'

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