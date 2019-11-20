'use strict';

const open = document.querySelector('#open');
const close = document.querySelector('#close');
const header = document.querySelector('.header-fixed');
const anchors = document.querySelectorAll('.anchor');

function openElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    if (headerAnimate.style.display !== 'flex') {
        header.style.display = 'none';
        headerAnimate.style.display = 'flex';
        elem.style.animation = 'open-rotate .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    }
}

function closeElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    if (headerAnimate.style.display === 'flex') {
        elem.style.animation = 'close-rotate .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
        setTimeout(() => {
            header.style.display = 'flex';
            headerAnimate.style.display = 'none';
        }, 500)
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

function initSmoothScrolling(id) {
    const duration = 400;
    jump(`${id}`, {
        duration: duration,
        callback: function () {
            checkVisibilityFeedbackSection();
        }
    });
}

for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        const id = target.getAttribute('href');
        if (id !== '#') {
            getElem('close');
            setTimeout(() => {
                initSmoothScrolling(id);
                document.body.style.overflowY = 'hidden';
            }, 1000);
        }
    })
}

function checkVisibilityFeedbackSection() {
    const feedback = document.querySelector('.feedback');
    const logo = document.querySelector('.header__logo-wrap');
    const text = document.querySelector('.header__text');
    if (!!isVisible(feedback)) {
        text.style.display !== 'none' ? text.style.display = 'none' : null;
        logo.style.display !== 'flex' ? logo.style.display = 'flex' : null;
        console.log('yes');
    } else {
        text.style.display !== 'block' ? text.style.display = 'block' : null;
        logo.style.display !== 'none' ? logo.style.display = 'none' : null;
        console.log('no');
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

window.onload = function () {
    init();
    checkVisibilityFeedbackSection();
};


