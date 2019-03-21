const contactForms = document.querySelectorAll('.contact-form');

Array.from(contactForms).forEach(form => {
    const thisForm = form.querySelector('form');

    thisForm.addEventListener('submit', e => {
        e.preventDefault();
        const successMessage = form.querySelector('.success');
        const data = new FormData(e.target);

        window.handleFormSubmit('dev-traccoon.isdev.info/forms/intellectsoft/software-development-lp', data, {
            type: 'ContactForm'
        }).then(response => {
            if (response.data.status) {
                thisForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }}
        )
    });
});
