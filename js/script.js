// import {calc} from './modules/calc';
// import {cards} from './modules/cards';
// import {forms} from './modules/forms';
// import {modal} from './modules/modal';
// import {slider} from './modules/slider';
// import {tabs} from './modules/tabs';
// import {timer} from './modules/timer';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
window.addEventListener('DOMContentLoaded', () => {
    
    // const tabs = require('./modules/tabs'),
    //       modal = require('./modules/modal'),
    //       timer = require('./modules/timer'),
    //       slider = require('./modules/slider'),
    //       forms = require('./modules/forms'),
    //       cards = require('./modules/cards'),
    //       calc = require('./modules/calc');
    tabs();
    modal();
    timer('.timer','2022-12-20');
    slider({
        slidesX: '.offer__slide',
        sliderX: '.offer__slider',
        previousX: '.offer__slider-prev',
        totalX: '#total',
        currentX: '#current',
        nextX: '.offer__slider-next',
        slidesFieldX: '.offer__slider-inner',
        slidesWrapperX: '.offer__slider-wrapper',
        
        
    });
    forms();
    cards();
    calc();
    
});