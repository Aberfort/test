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

    thisForm.addEventListener('submit', e => {
        e.preventDefault();
        const successMessage = form.querySelector('.success');
        const data = new FormData(e.target);

        window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/mobile-app-guide', data, {
            type: 'ContactForm'
        }).then(response => {
            if (response.data.status) {
                dataLayer.push({'event': 'FormSubmit'});

                thisForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }}
        ).catch(error => {
            console.error(error);
        })
    });
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
