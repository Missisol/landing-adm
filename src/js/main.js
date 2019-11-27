'use strict';

const header = document.querySelector('.header__fixed');
const pagination = document.querySelector('.pagination__wrap');
const buttonMain = document.querySelector('.main__button');
const buttonSubmit = document.querySelector('.feedback__button');
const layouts = document.querySelectorAll('.layout');

/* Отвечает за анимацию секции страницы в десктопной версии*/
function openElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    if (headerAnimate.style.display !== 'flex') {
        header.style.display = 'none';
        headerAnimate.style.display = 'flex';
        pagination.style.opacity = '0';
        buttonMain.setAttribute('href', '#');
        buttonSubmit.setAttribute('disabled', 'disabled');
        buttonSubmit.classList.add('feedback__button_disabled');
        elem.classList.remove('layout__close-rotate');
        elem.classList.add('layout__open-rotate');

        // elem.style.animation = 'open-rotate 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    }
}

/* Отвечает за анимацию закрытия секции страницы в десктопной версии*/
function closeElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    if (headerAnimate.style.display === 'flex') {
        elem.classList.remove('layout__open-rotate');
        elem.classList.add('layout__close-rotate');

        // elem.style.animation = 'close-rotate .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
        setTimeout(() => {
            header.style.display = 'flex';
            headerAnimate.style.display = 'none';
            buttonMain.setAttribute('href', '#about');
            buttonSubmit.removeAttribute('disabled');
            buttonSubmit.classList.remove('feedback__button_disabled');
        }, 600)
    }
}

/* Проверяет видимость элемента в окне браузера */
function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    return coords.top < windowHeight;
}

/* Определяет, какой элемент видим в окне браузера и вызывает
функцию открытия/закрытия элемента */
function getElem(str) {
    // const elems = document.querySelectorAll('.layout');
    for (let elem of layouts) {
        if (isVisible(elem) && str === 'open') {
            openElem(elem);
        } else if (isVisible(elem) && str === 'close') {
            closeElem(elem);
        }
    }
}

/* Вызывает появление/скрытие бокового меню на планшетной и мобильной версиях */
function slideElem(e) {
    const toggle = document.querySelector('#toggle');
    const nav = document.querySelector('.nav');
    const text = document.querySelector('.header__text');
    const logo = document.querySelector('.header__logo-wrap');
    if (!toggle.classList.contains('active')) {
        toggle.classList.add('active');
        nav.classList.remove('nav__close-menu');
        nav.classList.add('nav__open-menu');
        text.classList.add('header__hidden');
        setTimeout(() => {
            logo.classList.add('header__hidden');
            // header.classList.add('transparent');
        }, 300);
        document.body.style.overflow = 'hidden';
    } else if (toggle.classList.contains('active')) {
        toggle.classList.remove('active');
        nav.classList.remove('nav__open-menu');
        nav.classList.add('nav__close-menu');
        text.classList.remove('header__hidden');
        setTimeout(() => {
            logo.classList.remove('header__hidden');
            // header.classList.remove('transparent');
        }, 600);
        document.body.style.overflow = '';
    }
}

/* Проверяет видимость последней страницы сайта для отображения/скрытия лого в хедере */
function checkVisibilityFeedbackPage() {
    const feedback = document.querySelector('.feedback');
    const logo = document.querySelector('.header__logo-wrap');
    const text = document.querySelector('.header__text');
    if (!!isVisible(feedback)) {
        text.style.display !== 'none' ? text.style.display = 'none' : null;
        logo.style.display !== 'flex' ? logo.style.display = 'flex' : null;
    } else {
        text.style.display !== 'block' ? text.style.display = 'block' : null;
        logo.style.display !== 'none' ? logo.style.display = 'none' : null;
    }
}

/* Проверяет видимость первой страницы для скрытия пагинации */
function checkVisibilityHomePage() {
    const home = document.querySelector('#home');
    !!isVisible(home) ? pagination.style.opacity = '0' :
        pagination.style.opacity = '1';
}

/* Определяет видимую страницу и активирует нужноый пункт пагинации */
function getPaginationActiveItem(link) {
    const elem = document.querySelector(link);
    const linkElems = document.querySelectorAll('.pagination__pag-item');

    for (let linkElem of linkElems) {
        const elemHref = linkElem.getAttribute('href');
        if (elemHref === link && !!isVisible(elem)) {
            if (link !== '#home') {
                linkElem.classList.add('pagination__pag-item_active');
                pagination.style.opacity = '1';
            } else {
                pagination.style.opacity = '0';
            }
        } else {
            linkElem.classList.remove('pagination__pag-item_active');
        }
    }
}

/* Инициирует плавный скроллинг */
function initSmoothScrolling() {
    $('.anchor').on('click', e => {
        e.preventDefault();
        const link = $(e.target).attr('href');
        let top = $(link).offset().top;
        setTimeout(() => {
            document.documentElement.clientWidth <= 1400 ? slideElem() : null;
            $('body, html').animate({
                scrollTop: top
            }, 600, function () {
                checkVisibilityFeedbackPage();
                getPaginationActiveItem(link);
            });
        }, 800)
    })
}

/* Находит для заданного элемента родительский элемент с указанным селектором */
function getParent(elem, parentSelector) {
    const parents = document.querySelectorAll(parentSelector);
    for (let i = 0; i < parents.length; i++) {
        let parent = parents[i];
        if (parent.contains(elem)) {
            return parent;
        }
    }
}

/* Определяет элемент по его data-атрибуту*/
function getElemByDatAttribute(attr) {
    for (let elem of layouts) {
        if (+elem.dataset.counter === attr) {
            return elem.getAttribute('id');
        }
    }
}

/* Инициирует сролл на один экран при прокрутке пользователем колесика мыши */
function initSmoothScrollingOnePage(e) {
    const parent = getParent(e.target, 'section');
    const counter = +parent.dataset.counter;
    let dist = document.documentElement.clientHeight;

    if (e && e.deltaY > 0) {
        $('body, html').animate({
            scrollTop: counter * dist,
        }, 600, function () {
            checkVisibilityFeedbackPage();
            getPaginationActiveItem(`#${getElemByDatAttribute(counter + 1)}`)
        });
    } else if (e && e.deltaY < 0) {
        $('body, html').animate({
            scrollTop: dist * (counter - 2),
        }, 600, function () {
            checkVisibilityFeedbackPage();
            getPaginationActiveItem(`#${getElemByDatAttribute(counter - 1)}`)
        });
    }
}

function debounce(fn, interval) {
    let timer;
    return function debounced() {
        clearTimeout(timer);
        let args = arguments;
        let that = this;
        timer = setTimeout(function initSmoothScrollingOnePage(e) {
            fn.apply(that, args);
        }, interval);
    };
}

/* Инициирует обработчики событий*/
function init() {
    const open = document.querySelector('#open');
    const close = document.querySelector('#close');
    const anchors = document.querySelectorAll('.anchor');
    const toggle = document.querySelector('#toggle');

    open.addEventListener('click', (e) => {
        getElem('open');
    });

    close.addEventListener('click', () => {
        getElem('close');
    });

    toggle.addEventListener('click', (e) => {
        slideElem();
    });

    for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            const id = target.getAttribute('href');
            if (id !== '#') {
                if (document.documentElement.clientWidth >= 1400) {
                    getElem('close');
                }
            }
        })
    }

    let delayScroll = debounce(initSmoothScrollingOnePage, 500);

    document.body.addEventListener('wheel', (e) => {
        delayScroll(e);
    })
}

window.onload = function () {
    init();
    initSmoothScrolling();
    checkVisibilityFeedbackPage();
    checkVisibilityHomePage();
};



