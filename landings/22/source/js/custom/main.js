const contactForms = document.body.querySelectorAll('.software-development .contact-form');

Array.from(contactForms).forEach(form => {
    const thisForm = form.querySelector('form');

    thisForm.addEventListener('submit', e => {
        e.preventDefault();
        const successMessage = form.querySelector('.success');
        const data = new FormData(e.target);
        const {url} = e.target.dataset;

        window.handleFormSubmit(url, data, {
            type: 'ContactForm'
        }).then(response => {
            if (response.data.status) {
                thisForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }}
        ).catch(error => {
            console.error(error);
        })
    });
});
