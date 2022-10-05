

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach((item) => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });

    const deadline = '2022-11-01';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {

            const t = getTimeRemaining(endTime);
            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }


    }

    setClock('.timer', deadline);

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
    })

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src='${this.src}' alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> $/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }


    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        "43",
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        "51",
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        "49",
        '.menu .container',
    ).render();

    ////////////////////forms/////////////////////////////////////////

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'loading...',
        succes: 'succes',
        fail: 'fail'
    };

    forms.forEach(item => {
        postData(item);
    });
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('http://127.0.0.1:8080/', {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => {
                return res.json();
            }).then(res => {
                console.log(res);
                statusMessage.textContent = message.succes;
            }).catch(() => {
                alert('Sorry, server is break');
            }).finally(() => {
                form.reset();
            })

            
            
        });
    }


});