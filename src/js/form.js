const form = document.querySelector('.feedback__form');

const element = document.querySelector('#input-phone');
let phoneMask = IMask(element, {
    mask: '+{7}(000)000-00-00',
});


class SubmitForm {

    constructor(apiURL, inputNames, formSelector, btnSubmitSelector, formEl = null, formValue = {}) {
        this.apiURL = apiURL;
        this.inputNames = inputNames;
        this.formSelector = formSelector;
        this.btnSubmitSelector = btnSubmitSelector;
        this.formEl = formEl;
        this.formValue = formValue;
    }

    init() {
        this.formEl = document.querySelector(this.formSelector);
        this.submitBtn = document.querySelector(this.btnSubmitSelector);
        this.rules = [
            {name: 'name', regexp: /^[a-zа-яё\s-]+$/i},
            {name: 'email', regexp: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/},
        ];

        for (let input of this.inputNames) {
            const inputEl = this.formEl[`${input}`];

            inputEl.name === 'phone' ? inputEl.addEventListener('input', () => this.checkPhone(inputEl)) :
                inputEl.addEventListener('input', () => this.checkFields(inputEl));
        }

        this.formEl.addEventListener('submit', e => this.formSubmit(e));
    }

    formSubmit(e) {
        e.preventDefault();

        if (this.validate()) {

            this.inputStringify();
            this.fetchForm();
        }
    }

    validate() {
        let isValid = true;

        for (let input of this.inputNames) {
            const inputEl = this.formEl[`${input}`];

            (inputEl.name === 'name' || inputEl.name === 'email') ?
                (!this.checkFields(inputEl) ? isValid = false : null)
                : null;

            inputEl.name === 'phone' ? (!this.checkPhone(inputEl) ? isValid = false : null)
                : null;
        }

        return isValid;
    }

    checkFields(inputEl) {
        let message = null;

        for (let rule of this.rules) {
            if (rule.name === inputEl.name) {
                !rule.regexp.test(inputEl.value) ?
                    (inputEl.value.trim() === '' ? message = 'Поле обязательно для заполнения' :
                        message = 'Проверьте корректность введенных данных')
                    : null;

                return this.validFunction(inputEl, message);
            }
        }
    }

    checkPhone(inputEl) {
        let message = null;
        const phone = phoneMask.on('complete', () => {
        });
        phone.unmaskedValue.length !== 11 ? message = ' Поле обязательно для заполнения' : null;

        return this.validFunction(inputEl, message);
    }

    validFunction(inputEl, message) {
        let isValid = true;

        if (message !== null) {
            this.setInvalidField(inputEl, message);
            isValid = false;
        } else {
            this.setValidField(inputEl);
        }

        return isValid;
    }

    setInvalidField(inputEl, message) {

        const field = document.querySelector(`.feedback__field-${inputEl.name}`);
        const label = document.querySelector(`.${inputEl.name}-label`);
        field.innerHTML = message;

        inputEl.classList.add('error');
        label.classList.add('error');
    }

    setValidField(inputEl) {
        const field = document.querySelector(`.feedback__field-${inputEl.name}`);
        const label = document.querySelector(`.${inputEl.name}-label`);
        field.innerHTML = '';

        inputEl.classList.remove('error');
        label.classList.remove('error');
    }

    inputStringify() {
        let inputValue = {};

        for (let input of this.inputNames) {

            const inputEl = this.formEl[`${input}`];
            inputValue[input] = inputEl.value;
        }

        return inputValue;
    }

    fetchForm() {
        this.formValue = this.inputStringify();
        console.log(this.formValue);

        fetch(this.apiURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.formValue)
        })
            .then(res => {
                if (res.status === 200) {
                    this.accept();
                }
            })
            .catch(err => console.log(err));
    }

    accept() {
        this.submitBtn.disabled = true;

        for (let input of this.formEl) {
            input.value = '';
        }
    }
}

const api = 'http://api-dm.amberlight.io/request/requests/';
const inputs = [
    'name',
    'email',
    'phone',
    'message',
    // 'check',
];
const formSelector = '.feedback__form';
const btnSubmitSelector = '.feedback__button';

const send = new SubmitForm(api, inputs, formSelector, btnSubmitSelector);

const btnSubmit = document.querySelector('#submit');

btnSubmit.addEventListener('click', () => {
    send.init();
});










