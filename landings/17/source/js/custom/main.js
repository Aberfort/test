const handleFormSubmit = window.handleFormSubmit // We got it from traccoon project.
const notifyDelay = 10000

$('.reg-link').click(function () {
    $('#container-reg')
        .css("display", "flex")
        .hide()
        .fadeIn(500);
    $('#page').fadeOut(200);
});

$('.form-block__link').click(function () {
    $('#page').fadeIn(500);
    $('#container-reg').fadeOut(200);
});

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}

const hide = elem => elem.style.display = 'none'
const show = elem => elem.style.display = 'block'

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
                required: false,
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
                        hide(form)
                        show(thxMessage)
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
                    show(contactErrorMessage)
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
