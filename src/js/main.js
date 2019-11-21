'use strict';

const open = document.querySelector('#open');
const close = document.querySelector('#close');
const header = document.querySelector('.header-fixed');
const anchors = document.querySelectorAll('.anchor');
const pagination = document.querySelector('.pagination__wrap');

function openElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    if (headerAnimate.style.display !== 'flex') {
        header.style.display = 'none';
        headerAnimate.style.display = 'flex';
        pagination.style.opacity = '0';
        elem.style.animation = 'open-rotate 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    }
}

function closeElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    if (headerAnimate.style.display === 'flex') {
        elem.style.animation = 'close-rotate .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
        setTimeout(() => {
            header.style.display = 'flex';
            headerAnimate.style.display = 'none';
        }, 600)
    }
}

function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    return coords.top < windowHeight;
}

function getElem(str) {
    const elems = document.querySelectorAll('.layout');
    for (let elem of elems) {
        if (isVisible(elem) && str === 'open') {
            openElem(elem);
        } else if (isVisible(elem) && str === 'close') {
            closeElem(elem);
        }
    }
}

for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        const id = target.getAttribute('href');
        if (id !== '#') {
            getElem('close');
        }
    })
}

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

function checkVisibilityHomePage() {
    const home = document.querySelector('#home');
    !!isVisible(home) ? pagination.style.opacity = '0' :
        pagination.style.opacity = '1';
}

function checkVisibilityPages(link) {
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

function init() {
    open.addEventListener('click', (e) => {
        getElem('open');
    });

    close.addEventListener('click', () => {
        getElem('close');
    });
}

function initSmoothScrolling() {
    $('.anchor').on('click', e => {
        e.preventDefault();
        const link = $(e.target).attr('href');
        let top = $(link).offset().top;
        setTimeout(() => {
            $('body, html').animate({
                scrollTop: top
            }, 1000, function () {
                checkVisibilityFeedbackPage();
                checkVisibilityPages(link);
            });
        }, 1000)
    })
}

window.onload = function () {
    init();
    initSmoothScrolling();
    checkVisibilityFeedbackPage();
    checkVisibilityHomePage();
};



