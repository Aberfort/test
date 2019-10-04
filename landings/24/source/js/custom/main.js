const contactForms = document.body.querySelectorAll('.mobile-app-guide .contact-form');

Array.from(contactForms).forEach(form => {
    const thisForm = form.querySelector('form');

    thisForm.addEventListener('submit', e => {
        e.preventDefault();
        const successMessage = form.querySelector('.success');
        const data = new FormData(e.target);

        window.handleFormSubmit('https://traccoon.intellectsoft.net/forms/intellectsoft/mobile-app-guide', data, {
            type: 'ContactForm'
        }).then(response => {
            if (response.data.status) {
                dataLayer.push({'event': 'EbookDownload'});

                thisForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }}
        ).catch(error => {
            console.error(error);
        })
    });
});
