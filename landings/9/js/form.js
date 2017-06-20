const handleFormSubmit = window.handleFormSubmit
const mainForm = document.querySelector('#ebooken')
const formBox = document.querySelector('.form-box')
const formAction = mainForm.getAttribute('data-url')
const thxMessage = document.querySelector('.contact-form-msg')
const contactErrorMessage = document.querySelector('.contact__error')

$.validator.methods.number = function(value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}

function hide(elem) {
    elem.style.display = 'none'
}

function show(elem) {
    elem.style.display = 'block'
}

$('#ebooken').validate({
    rules: {
        name: {
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
                    hide(formBox)
                    show(thxMessage)
                } else {
                    contactErrorMessage.textContent =
                        'Check selected fields, please.'
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
