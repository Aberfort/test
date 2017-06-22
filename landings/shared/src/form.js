const handleFormSubmit = window.handleFormSubmit // We got it from traccoon project.
const getNDACheckbox = document.querySelector('#terms')
const uploadErrorMessage = 'You can upload doc, docx, pdf, odt, ott, txt files under 25mb.'
const notifyDelay = 10000

getNDACheckbox.addEventListener('click', e => {
    e.target.value === '1' ? (e.target.value = '0') : (e.target.value = '1')
})

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}
$.validator.addMethod('filesize', function (value, element, param) {
    // param = size (in bytes)
    return this.optional(element) || element.files[0].size <= param
})

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
            country: {
                required: true
            },
            email: {
                required: true,
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
        submitHandler: function (form, event) {
            event.preventDefault()
            const rowData = new FormData(form)
            const url = form.getAttribute('data-url')
            const contactErrorMessage = form.querySelector('.contact__error')
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

const fileInput = document.querySelector('input[type=file]')

fileInput &&
fileInput.addEventListener('change', e => {
    let fileName = e.target.value.split('\\').pop()
    const label = e.target.parentElement.querySelector('.contact__file-label')
    const maxLength = 40

    if (fileName.length >= maxLength) {
        is.mobile()
            ? (fileName = `${fileName.slice(0, 5)}...${fileName.slice(-5)}`)
            : (fileName = `${fileName.slice(0, 15)}...${fileName.slice(
            -15
        )}`)
    }

    fileName
        ? (label.querySelector('span').innerHTML = fileName)
        : (label.querySelector('span').innerHTML = e.target.dataset.label)
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
