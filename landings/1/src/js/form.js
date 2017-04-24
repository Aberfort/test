const handleFormSubmit = window.handleFormSubmit;
const mainForm = document.querySelector('#mainForm');
const getNDACheckbox = document.querySelector('#terms');
const newAction = mainForm.getAttribute('action');
const thxMessage = document.querySelector('.contact__complete');

getNDACheckbox.addEventListener('click', function (e) {
    e.target.value === '1'
        ? e.target.value = '0'
        : e.target.value = '1'
});

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value);
};

$("#mainForm").validate({
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
            maxlength: 255
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
    },
    messages: {
        email: {
            email: "Please enter a valid email address."
        }
    },
    submitHandler: function () {
        const rowData = new FormData(mainForm);
        rowData.append('handler_id', mainForm.dataset.handler);

        handleFormSubmit(newAction, rowData, {
            type: mainForm.dataset.type
        }).then(res => {
            mainForm.style.display = 'none';
            thxMessage.style.display = 'block';
        });
    }
});