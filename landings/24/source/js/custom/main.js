const contactForms = document.body.querySelectorAll('.mobile-app-guide .contact-form');

Array.from(contactForms).forEach(form => {
    const thisForm = form.querySelector('form');

    thisForm.addEventListener('submit', e => {
        e.preventDefault();
        const successMessage = form.querySelector('.success');
        const data = new FormData(e.target);

        window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/how-to-create-a-mobile-app-guide', data, {
            type: 'ContactForm'
        }).then(response => {
            if (response.data.status) {
                dataLayer.push({'event': 'FormSubmit'});

                thisForm.classList.add('hidden');
                successMessage.classList.remove('hidden');

                let link = document.createElement('a');
                link = Object.assign(link, {href: '/static/24/data/Mobile_App_eBook.pdf', download: 'Mobile_App_eBook.pdf'});
                link.click();
                setTimeout(() => (link = null), 1000);
            }}
        ).catch(error => {
            console.error(error);
        })
    });
});
