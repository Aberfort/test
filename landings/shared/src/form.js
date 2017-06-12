const handleFormSubmit = window.handleFormSubmit // We got it from traccoon project.
const getNDACheckbox = document.querySelector('#terms')

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

