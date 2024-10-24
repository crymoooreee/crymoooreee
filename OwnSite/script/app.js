const text = document.querySelector(".text p");
        text.innerHTML = text.innerText.split("").map((letter, i) =>
        `<span style="transform:rotate(${i * 8.2}deg")>${letter}</span>`
        )
        .join("");

const modal = document.querySelector('.modal');
const close_btn = document.querySelector('.btn-close');
const talk_btn = document.querySelector('.talk_btn');
const aboutBtn = document.querySelector('.about_btn'); // Изменено имя переменной
let modalActive = false; // Инициализируем переменную для отслеживания состояния модального окна

// Добавляем обработчик события для кнопки
aboutBtn.addEventListener('click', () => {
    modalActive = !modalActive; // Изменяем состояние модального окна

    if (modalActive) {
        modal.setAttribute('style', 'display: block !important;');
        setTimeout(function() {
                modal.style.opacity = 1;
                modal.style.transition = 'opacity 1s ease';
        }, 0)
} else {
        modal.setAttribute('style', 'display: none !important;');
        setTimeout(function() {
                modal.style.opacity = 0;
                modal.style.transition = 'opacity 1s ease';
        }, 0)
    }
});
talk_btn.addEventListener('click', () => {
        modalActive = !modalActive; // Изменяем состояние модального окна
    
        if (modalActive) {
            modal.setAttribute('style', 'display: block !important;');
            setTimeout(function() {
                    modal.style.opacity = 1;
                    modal.style.transition = 'opacity 1s ease';
            }, 0)
    } else {
            modal.setAttribute('style', 'display: none !important;');
            setTimeout(function() {
                    modal.style.opacity = 0;
                    modal.style.transition = 'opacity 1s ease';
            }, 0)
        }
    });
close_btn.addEventListener('click', () => {
        modalActive = !modalActive; // Изменяем состояние модального окна
    
        if (modalActive) {
            modal.setAttribute('style', 'display: block !important;');
            setTimeout(function() {
                    modal.style.opacity = 1;
                    modal.style.transition = 'opacity .5s ease';
            }, 100)
    } else {
            modal.setAttribute('style', 'display: none !important;');
            setTimeout(function() {
                    modal.style.opacity = 0;
                    modal.style.transition = 'opacity .5s ease';
            }, 100)
        }
    });