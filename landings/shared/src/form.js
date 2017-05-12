const handleFormSubmit = window.handleFormSubmit
const mainForm = document.querySelector('#mainForm')
const getNDACheckbox = document.querySelector('#terms')
const formAction = mainForm.getAttribute('data-url')
const thxMessage = document.querySelector('.contact__complete')
const contactErrorMessage = document.querySelector('.contact__error')

getNDACheckbox.addEventListener('click', function(e) {
    e.target.value === '1' ? (e.target.value = '0') : (e.target.value = '1')
})

$.validator.methods.number = function(value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}

$.validator.addMethod('filesize', function(value, element, param) {
    // param = size (in bytes)
    return this.optional(element) || element.files[0].size <= param
})

function hide (elem) {
    elem.style.display = 'none'
}

function show (elem) {
    elem.style.display = 'block'
}

$('#mainForm').validate({
    rules: {
        first_name: {
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
    submitHandler: function() {
        const rowData = new FormData(mainForm)
        rowData.append('handler_id', mainForm.dataset.handler)

        handleFormSubmit(formAction, rowData, {
            type: mainForm.dataset.type
        })
            .then(res => {
                if (res.data.status) {
                    hide(mainForm)
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
                contactErrorMessage.style.display = 'block'
                console.log(error)
            })
    }
})
