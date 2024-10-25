const languageButton = document.getElementById('language-toggle');
const inner_title = document.getElementById('inner_title');
const inner_text = document.getElementById('inner_text');
const modal_title = document.getElementById('modal_title');
const message = document.getElementById('message1');
const name1 = document.getElementById('name1');
const phone = document.getElementById('phone1');
const mail = document.getElementById('mail');
const about_text_title = document.getElementById('about_text_title');
const about_title = document.getElementById('about_title');
const about_text = document.getElementById('about_text');
const about_text2 = document.getElementById('about_text2');
const about_end = document.getElementById('about_end');
const service_title = document.getElementById('service_title');
const about_work_title = document.getElementById('about_work_title');
const service_subtitles = document.querySelectorAll('.servire_subtitle');
const service_texts = document.querySelectorAll('.service_text');
const talk_title = document.querySelector('.talk_title');
const talk_text = document.querySelector('.talk_text');

// Получаем язык из localStorage или устанавливаем по умолчанию
let isEnglish = localStorage.getItem('language') === 'en';

// Функция для обновления текста на странице
function updateText() {
    const languageText = languageButton.querySelector('.language-text');

    languageText.textContent = isEnglish ? 'EN' : 'RU';

    // Функция для плавного изменения текста
    const fadeOut = (element) => {
        if (element) {
            element.classList.add('fade-out');
            setTimeout(() => {
                element.classList.remove('fade-out');
            }, 300); // Время должно соответствовать времени перехода в CSS
        }
    };
    
    fadeOut(languageText);
    fadeOut(inner_title);
    fadeOut(inner_text);
    fadeOut(modal_title);
    fadeOut(message);
    fadeOut(name1);
    fadeOut(phone);
    fadeOut(mail);
    fadeOut(about_title);
    fadeOut(about_text_title);
    fadeOut(about_text);
    fadeOut(about_text2);
    fadeOut(about_end);
    fadeOut(service_title);
    service_subtitles.forEach(subtitle => fadeOut(subtitle));
    service_texts.forEach(text => fadeOut(text));
    fadeOut(talk_title);
    fadeOut(talk_text);

    setTimeout(() => {
        if (inner_title) {
            inner_title.innerHTML = isEnglish ? "Hello people!" : "Привет, народ!";
        }
        if (inner_text) {
            inner_text.innerHTML = isEnglish ? "WELCOME TO<br>CRY STUDIO" : "Привет от<br>CRY STUDIO";
        }
        if (modal_title) {
            modal_title.innerHTML = isEnglish ? "Contact us" : "Связаться с нами";
        }
        if (message) {
            message.innerHTML = isEnglish ? "Message" : "Введите сообщение";
        }
        if (name1) {
            name1.innerHTML = isEnglish ? "Your name" : "Ваше имя";
        }
        if (phone) {
            phone.innerHTML = isEnglish ? "Phone number" : "Номер телефона";
        }
        if (mail) {
            mail.innerHTML = isEnglish ? "Email" : "Электронная почта";
        }
        if (about_title) {
            about_title.innerHTML = isEnglish ? "About" : "О нас";
        }
        if (about_text_title) {
            about_text_title.innerHTML = isEnglish ? "We make beautiful websites for you!" : "Мы создаем красивые сайты для вас!";
        }
        if (about_text) {
            about_text.innerHTML = isEnglish ? "Our team develops unique and<br>functional websites that reflect your<br>personality and attract customers. We<br>combine stylish design with usability." : "Наша команда разрабатывает уникальные и<br>функциональные веб-сайты, которые отражают вашу<br>индивидуальность и привлекают клиентов. Мы<br>сочетаем стильный дизайн с удобством использования.";
        }
        if (about_text2) {
            about_text2.innerHTML = isEnglish ? "Let's realize your ideas together!" : "Давайте воплотим ваши идеи вместе!";
        }
        if (about_end) {
            about_end.innerHTML = isEnglish ? "FEATURED WORKS" : "НАШИ РАБОТЫ";
        }
        if (service_title) {
            service_title.innerHTML = isEnglish ? "Our Services" : "Наши услуги";
        }
        service_subtitles.forEach((subtitle, index) => {
            if (subtitle) {
                subtitle.innerHTML = isEnglish ? ["Adaptation", "Development", "Improve", "Hosting", "Domain"][index] : ["Адаптация", "Разработка", "Улучшение", "Хостинг", "Домен"][index];
            }
        });
        service_texts.forEach((text, index) => {
            if (text) {
                text.innerHTML = isEnglish ? ["Site developments", "Site development", " Site improvement", "Installing the site on hosting", "Transferring the site to a domain"][index] : ["Разработка сайта", "Разработка сайта", "Улучшение сайта", "Установка сайта на хостинг", "Перенос сайта на домен"][index];
            }
        });
        if (talk_title) {
            talk_title.innerHTML = isEnglish ? "Want a beautiful website?" : "Хотите красивый сайт?";
        }
        if (talk_text) {
            talk_text.innerHTML = isEnglish ? "Let’s Talk" : "Давайте поговорим";
        }
        if (about_work_title) {
            about_work_title.innerHTML = isEnglish ? "What was done in this work" : "Что было сделано в ходе этой работы";
        }
    }, 300); // Время должно соответствовать времени перехода в CSS
}

// Обновляем текст на странице при загрузке
updateText();

languageButton.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем переход по ссылке

    isEnglish = !isEnglish; // Переключаем состояние языка
    localStorage.setItem('language', isEnglish ? 'en' : 'ru'); // Сохраняем язык в localStorage

    updateText(); // Обновляем текст на странице
});