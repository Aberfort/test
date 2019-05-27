const contactForms = document.body.querySelectorAll('.tech-workshops .contact-form');

Array.from(contactForms).forEach(form => {
    const thisForm = form.querySelector('form');
    const inputs = thisForm.querySelectorAll('input');

    Array.from(inputs).forEach(input => {
        input.addEventListener('keyup', e => {
            if (e.target.value !== '') {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        })
    });
});

$('.tech-workshops .contact-form form').each(function() {
    $(this).validate({
        errorClass: 'has-error',
        validClass: 'has-success',
        showErrors: function(errorMap) {
            if (errorMap['attach']) Notify(uploadErrorMessage, notifyDelay);
            this.defaultShowErrors()
        },
        highlight: function(elem, errorClass, validClass) {
            $(elem)
                .parent()
                .addClass(errorClass)
                .removeClass(validClass)
        },
        unhighlight: function(elem, errorClass, validClass) {
            $(elem)
                .parent()
                .removeClass(errorClass)
                .addClass(validClass)
        },
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
                required: false,
                maxlength: 9999
            }
        },
        messages: false,
        submitHandler: function(form, event) {
            event.preventDefault();
            const rowData = new FormData(form);
            const url = form.getAttribute('data-url');
            const successMessage = document.querySelector('.tech-workshops .contact-form .success-message');

            window.handleFormSubmit(url, rowData, {
                type: 'ContactForm'
            }).then(res => {
                if (res.data.status) {
                    window.dataLayer.push({'event': 'FormSubmit'});
                    form.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                }
            }).catch(error => {
                console.log(error);
            })
        }
    })
});

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    responsive:{
        0:{
            items: 1,
            nav: false,
            stagePadding: 40,
        },
        500:{
            nav: false,
            items: 2,
            stagePadding: 40,
        },
        576:{
            nav: false,
            items: 2
        },
        620:{
            nav: true,
            items: 2
        },
        768:{
            nav: false,
            items: 3
        },
        800:{
            nav: true,
            items: 3
        },
        992:{
            nav: false,
            items: 4
        },
        1040:{
            nav: true,
            items: 4
        }
    }
});
