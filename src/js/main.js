'use strict';

const open = document.querySelector('#open');
const close = document.querySelector('#close');
const header = document.querySelector('.header-fixed');
// const headerAnimate = document.querySelectorAll('.header-animated');
const nav = document.querySelector('.nav__wrapper');

function init() {
    let widthOfScrollBar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflowY = 'hidden';
    // document.body.style.paddingRight = widthOfScrollBar + 'px';

    // let a = nav.style.width = `100% - ${widthOfScrollBar}px`;
    // console.log(a);
}

function openElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    header.style.display = 'none';
    headerAnimate.style.display = 'flex';
    elem.style.animation = 'open-rotate 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
}

function closeElem(elem) {
    const headerAnimate = elem.querySelector('.header__animated');
    elem.style.animation = 'close-rotate 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    setTimeout(() => {
        header.style.display = 'flex';
        headerAnimate.style.display = 'none';
    }, 1000)
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

open.addEventListener('click', (e) => {
    getElem('open');
});

close.addEventListener('click', () => {
    getElem('close');
});


function enableScroll(elem) {
    getElem('close');
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '0';
}

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    const elm = document.querySelector(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

function smoothScroll(eID) {
    const startY = currentYPosition();
    const stopY = elmYPosition(eID) - 24;
    const distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    let step = Math.round(distance / 25);

    console.log('startY', startY, 'stopY', stopY, 'step', step);


    let leapY = stopY > startY ? startY + step : startY - step;
    console.log('leapY', leapY);

    let timer = 0;
    if (stopY > startY) {
        for (let i = startY; i < stopY; i += step) {
            setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

const anchors = document.querySelectorAll('.anchor');

for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const target = e.target;
        const id = target.getAttribute('href');
        console.log('target', target,);

        if (id !== '#') {
            enableScroll();
            setTimeout(() => {
                smoothScroll(id);
                document.body.style.overflowY = 'hidden';
            }, 1500)
        }
    })
}


window.onload = function () {
    init();
};
