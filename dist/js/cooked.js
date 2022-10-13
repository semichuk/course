/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calc)
/* harmony export */ });
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

// export {calc};


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cards)
/* harmony export */ });
function cards() {
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

    const getData = async (url, data) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getData('http://localhost:3000/menu')
        .then((data) => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })

}

// export {cards};

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms)
/* harmony export */ });
function forms() {
       ////////////////////forms/////////////////////////////////////////


       const forms = document.querySelectorAll('form');

       const message = {
           loading: 'loading...',
           succes: 'succes',
           fail: 'fail'
       };
   
       forms.forEach(item => {
           bindPostData(item);
       });
   
       const postData = async (url, data) => {
           const response = await fetch(url, {
               method: 'POST',
               headers: {
                   'Content-type': 'application/json'
               },
               body: data
           });
   
           return await response.json();
       };
   
   
   
       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
               const formData = new FormData(form);
   
               const statusMessage = document.createElement('div');
               statusMessage.classList.add('status');
               statusMessage.textContent = message.loading;
               form.append(statusMessage);
   
               // const object = {};
               // formData.forEach((value, key) => {
               //     object[key] = value;
               // });
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
               postData('http://localhost:3000/requests', json)
                   .then(res => {
                       console.log(res);
                       statusMessage.textContent = message.succes;
                   }).catch(() => {
                       alert('Sorry, server is break');
                   }).finally(() => {
                       form.reset();
                   })
   
   
   
           });
       }
   
}

// export {forms};

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modal),
/* harmony export */   "modal": () => (/* binding */ modal)
/* harmony export */ });
function modal() {
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



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider),
/* harmony export */   "slider": () => (/* binding */ slider)
/* harmony export */ });
function slider({slidesX, sliderX, previousX, totalX, currentX, nextX, slidesWrapperX, slidesFieldX}) {
       /////////////////////////////////////////slider/////////////////////////////////////////////////////////////////////////////////////
       const slides = document.querySelectorAll(slidesX),
       slider = document.querySelector(sliderX),
       previous = document.querySelector(previousX),
       total = document.querySelector(totalX),
       current = document.querySelector(currentX),
       next = document.querySelector(nextX),
       slidesWrapper = document.querySelector(slidesWrapperX),
       slidesField = document.querySelector(slidesFieldX),
       width = window.getComputedStyle(slidesWrapper).width;

   let slideIndex = 1;
   let offset = 0;

   if (slides.length < 10) {
       total.textContent = `0${slides.length}`;
       current.textContent = `0${slideIndex}`;
   } else {
       total.textContent = slides.length;
       current.textContent = slideIndex;
   }
   slides.forEach(slide => {
       slide.style.width = width;
   });
   //////////////////////////////dots for slides////////////////////////////////
   slider.style.position = 'relative';
   const indicators = document.createElement('ol'),
       dots = [];

   indicators.classList.add('carousel-indicators');
   slider.append(indicators);
   for (let i = 0; i < slides.length; i++) {
       const dot = document.createElement('li');
       dot.setAttribute('data-slide', i + 1);
       dot.classList.add('dot');
       if (i === 0) {
           dot.style.opacity = 1;
       }
       dot.addEventListener('click', e => {
           const slideTo = e.target.getAttribute('data-slide');

           slideIndex = slideTo;
           offset = +width.replace(/\D/g, '') * (slideTo - 1);

           slidesField.style.transform = `translateX(-${offset}px)`;

           if (slides.length < 10) {
               current.textContent = `0${slideIndex}`;
           } else {
               current.textContent = slideIndex;
           }

           dots.forEach(dot => dot.style.opacity = '0.5');
           dots[slideIndex - 1].style.opacity = 1;

       })
       indicators.append(dot);
       dots.push(dot);
   }



   next.addEventListener('click', () => {
       if (offset === +width.replace(/\D/g, '') * (slides.length - 1)) {
           offset = 0;
       } else {
           offset += +width.replace(/\D/g, '');
       }
       slidesField.style.transform = `translateX(-${offset}px)`;

       if (slideIndex === slides.length) {
           slideIndex = 1;
       } else {
           slideIndex++;
       }

       if (slides.length < 10) {
           current.textContent = `0${slideIndex}`;
       } else {
           current.textContent = slideIndex;
       }

       dots.forEach(dot => dot.style.opacity = '0.5');
       dots[slideIndex - 1].style.opacity = 1;
   });

   previous.addEventListener('click', () => {
       if (offset === 0) {
           offset = +width.replace(/\D/g, '') * (slides.length - 1);
       } else {
           offset -= +width.replace(/\D/g, '');
       }
       slidesField.style.transform = `translateX(-${offset}px)`;

       if (slideIndex === 1) {
           slideIndex = slides.length;
       } else {
           slideIndex--;
       }

       if (slides.length < 10) {
           current.textContent = `0${slideIndex}`;
       } else {
           current.textContent = slideIndex;
       }

       dots.forEach(dot => dot.style.opacity = '0.5');
       dots[slideIndex - 1].style.opacity = 1;
   });
}



/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs),
/* harmony export */   "tabs": () => (/* binding */ tabs)
/* harmony export */ });
function tabs() {
//////////////////////////////tabs/////////////////////////////
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
}



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer),
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });
function timer(id , deadline) {
    

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

    setClock(id, deadline);

}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
// import {calc} from './modules/calc';
// import {cards} from './modules/cards';
// import {forms} from './modules/forms';
// import {modal} from './modules/modal';
// import {slider} from './modules/slider';
// import {tabs} from './modules/tabs';
// import {timer} from './modules/timer';







window.addEventListener('DOMContentLoaded', () => {
    
    // const tabs = require('./modules/tabs'),
    //       modal = require('./modules/modal'),
    //       timer = require('./modules/timer'),
    //       slider = require('./modules/slider'),
    //       forms = require('./modules/forms'),
    //       cards = require('./modules/cards'),
    //       calc = require('./modules/calc');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer','2022-12-20');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        slidesX: '.offer__slide',
        sliderX: '.offer__slider',
        previousX: '.offer__slider-prev',
        totalX: '#total',
        currentX: '#current',
        nextX: '.offer__slider-next',
        slidesFieldX: '.offer__slider-inner',
        slidesWrapperX: '.offer__slider-wrapper',
        
        
    });
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    
});
})();

/******/ })()
;
//# sourceMappingURL=cooked.js.map