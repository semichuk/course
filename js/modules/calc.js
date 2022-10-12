function calc() {
    //////////////////////calculator/////////////////

    const result = document.querySelector('.calculating__result span');
    let height, sex, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
        document.querySelectorAll('#gender div').forEach((item) => {
            if (item.getAttribute('id') === sex) {
                item.classList.add('calculating__choose-item_active');
            } else {
                item.classList.remove('calculating__choose-item_active');
            }
        });

    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
        document.querySelectorAll('.calculating__choose_big div').forEach(item => {
            if (item.getAttribute('data-ratio') === ratio) {
                item.classList.add('calculating__choose-item_active');
            } else {
                item.classList.remove('calculating__choose-item_active');
            }
        })
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function calcTotal() {
        if (!height || !sex || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))

                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }



                elements.forEach(item => {
                    item.classList.remove(activeClass);
                })

                e.target.classList.add(activeClass);

                calcTotal();

            });
        });


    }

    function getDynamicInformation(selector) {
        const input = document.querySelector('#' + selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';

            }
            switch (input.getAttribute('id')) {

                case 'height':
                    height = +input.value;
                    break;

                case 'weight':
                    weight = +input.value;
                    break;

                case 'age':
                    age = +input.value;
                    break;


            }

            calcTotal();

        });
    }

    document.querySelectorAll('.calculating__choose_medium input').forEach((item) => {
        getDynamicInformation(item.getAttribute('id'));
    });
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')
    // showSLides(slideIndex);


    // function showSLides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }

    // }

    // function plusSlides(n) {
    //     showSLides(slideIndex += n);
    // }

    // previous.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // })
}

export {calc};
