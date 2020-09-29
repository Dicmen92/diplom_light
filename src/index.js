'use strict';

import togglePopup from './modules/togglePopup';
import sendForm from './modules/sendForm';
import collapseQuestion from './modules/collapseQuestion';
import addBtnLarger from './modules/addBtnLarger';
import togglePopupDisc from './modules/togglePopupDisc';
import togglePopupCheck from './modules/togglePopupCheck';
import togglePopupQuest from './modules/togglePopupQuest';
import constructorСalc from './modules/constructorСalc';
import calc from './modules/calc';

//popup "Как к вам обращаться"
togglePopup();
//send-ajax-form 
sendForm();
//аккордеон (часто задаваемые вопросы)
collapseQuestion();
//кнопка "Больше..."
addBtnLarger();
//кнопка "Заказать со скидкой", "Узнать цену со скидкой"
togglePopupDisc();
//кнопка "Получить чек-лист и скидку"  Закажите бесп.замер
togglePopupCheck();
//кнопка "Получить консультацию" Остались вопросы
togglePopupQuest();
//конструктор-калькулятор в виде аккордеона 
constructorСalc();
//конструктор-калькулятор подсчеты
calc();