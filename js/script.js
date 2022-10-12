import {calc} from './modules/calc';
import {cards} from './modules/cards';
import {forms} from './modules/forms';
import {modal} from './modules/modal';
import {slider} from './modules/slider';
import {tabs} from './modules/tabs';
import {timer} from './modules/timer';
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
    timer();
    slider();
    forms();
    cards();
    calc();
    
});