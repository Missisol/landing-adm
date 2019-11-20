const advantagesTexts = [
    {
        num: 1,
        text: `Изучайте свою аудиторию: типы и стили потребляемого контента, паттерны поведения
        в цифровом мире, досуг, объем доходов, круг общения, радости, боли и страхи.`
    },
    {
        num: 2,
        text: `Налаживайте со своей аудиторией тесную коммуникацию и предлагайте нужные ей услуги и 
        продукты в необходимом объеме в подходящее время.`
    },
    {
        num: 3,
        text: `Забирайте внимание своей аудитории у конкурентов - и получайте новых лояльных клиентов.`
    },
    {
        num: 4,
        text: `Анализируйте поведение и реакции ваших клиентов и подписчиков, владейте полной информацией 
        об эффективности ваших маркетинговых кампаний. Расходуйте эффективнее, зарабатывайте больше.`
    }
];

const examplesTexts = [
    {
        num: 2,
        text: `ЗАО Тандер (торговая сеть “Магнит”) обладает огромной сетью торговых точек 
        на территории России (20 497 по состоянию на конец сентября 2019 г.) Для развития бизнеса, 
        повышения эффективности продаж и предложения товаров потребителям 
        в соответствии со спросом, ритейлер использует цифровые технологии. В частности, Data-маркетинг 
        применяется в сфере категорийного мерчендайзинга и эффективного управления цепочками поставок посредством GPS.`
    },
    {
        num: 3,
        text: `Вымпелком не только использует Data-маркетинг для проведения своих эффективных рекламных 
        кампаний, но также предлагает его в качестве платной услуги. Данные о пользователях оператор 
        собирает по различным каналам, включая свою абонентскую базу сотовой связи, систему определения 
        местоположения, подключения к точкам Wi-Fi-доступа, активность подписчиков ТВ-сервисов.`
    },
    {
        num: 4,
        text: `PepsiCo - это компания, производящая упакованные потребительские товары. Она использует огромные 
        объемы данных для эффективного управления цепочками поставок, 
        в частности, для согласования с заказчиками и прогнозирования их потребностей 
        в производстве и отгрузке. Таким образом, компания гарантирует, что у ритейлеров есть нужные продукты, 
        в нужных объемах и в нужное время.`
    },
];

function toggleExamplesView(elem) {
    const statistic = document.querySelector('.examples__statistics');
    const textBlock = document.querySelector('.examples__text');
    console.log(elem);

    if (elem.dataset.id === '1') {
        textBlock.style.display = 'none';
        statistic.style.display = 'block';
    } else {
        statistic.style.display = 'none';
        textBlock.style.display = 'block';
    }
}

function activateMenuItem(items, target, selector) {
    for (let item of items) {
        if (!item.classList.contains(selector) && item === target) {
            item.classList.add(selector);
            selector === 'layout__name_active' ? toggleExamplesView(item) : null;
        } else {
            item.classList.remove(selector);
        }
    }
}

function getAdvantagesText(elem) {
    const advText = document.querySelector('.advantages__text');
    const num = elem.dataset.id;
    const item = advantagesTexts.filter(item => item.num === +num);
    const text = item[0].text;
    advText.innerText = '';
    advText.insertAdjacentText('afterbegin', text);
}

function getExamplesText(elem) {
    const exText = document.querySelector('.examples__text');
    const num = elem.dataset.id;
    const item = examplesTexts.filter(item => item.num === +num);
    const text = item[0].text;
    exText.innerText = '';
    exText.insertAdjacentText('afterbegin', text);
}

function makeAdvantagesPage(elem) {
    const numPages = document.querySelectorAll('.advantages__num-page');
    activateMenuItem(numPages, elem, 'layout__num-page_active');
}

function makeExamplesPage(elem) {
    const namePages = document.querySelectorAll('.examples__name');
    activateMenuItem(namePages, elem, 'layout__name_active');
}

function initPages() {
    const advWrap = document.querySelector('.advantages__num-wrap');
    advWrap.addEventListener('click', (e) => {
        makeAdvantagesPage(e.target);
        getAdvantagesText(e.target);
    });
    
    const exTexts = document.querySelector('.examples__name-wrap');
    exTexts.addEventListener('click', (e) => {
        makeExamplesPage(e.target);
        getExamplesText(e.target);
    });
}

initPages();
