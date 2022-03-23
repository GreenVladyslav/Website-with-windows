import calcScroll from "./calcScroll";

function closeModal() {
    const windows = document.querySelectorAll('[data-modal]');

    windows.forEach(item => {
        item.style.display = 'none';
        document.body.style.overflow = '';
     });
}

function modalShow(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // document.body.classList.add('modal-open'); bootstrap
}

function modalHide(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'none';
    document.body.style.overflow = '';
    // document.body.classList.remove('modal-open');
}

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();

                    windows.forEach(item => {
                       item.style.display = 'none';
                    });

                    modalShow(modalSelector);
                    document.body.style.marginRight = `${scroll}px`;
                }
            }); 
            
            if (item.classList.contains('popup_calc_button') || item.classList.contains('popup_calc_profile_button')) {
                item.disabled = true;
            }
        });


        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modalHide(modalSelector);
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modalHide(modalSelector);
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    function showModalByScroll() {
    const modal = document.querySelector('.popup');
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 10000);
}; 


export default modals;
export {closeModal};