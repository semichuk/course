export default function modal() {
    ////////////////////modal window/////////////////////////////////////////
    function closeModalWindow(modal) {
        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        // clearTimeout(modalSetTime);
    }
    // const modalSetTime = setTimeout(openModal, 5000);

    const modalTrigers = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    const closeModalWindowBind = closeModalWindow.bind(null, modalWindow);


    modalTrigers.forEach((item) => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    modalCloseBtn.addEventListener('click', closeModalWindowBind);

    modalWindow.addEventListener('click', (event) => {

        if (event.target === modalWindow) {
            closeModalWindow(event.target);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModalWindowBind();
        }
    });

}

export {modal};