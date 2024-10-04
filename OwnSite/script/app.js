const text = document.querySelector(".text p");
        text.innerHTML = text.innerText.split("").map((letter, i) =>
        `<span style="transform:rotate(${i * 8.2}deg")>${letter}</span>`
        )
        .join("");

const modal = document.querySelector('.modal');
const modal_close = document.querySelector('.modal_close');
const talk_btn = document.querySelector('.talk_btn');
const aboutBtn = document.querySelector('.about_btn'); // Изменено имя переменной
const modal_btn = document.querySelector('.modal_btn'); // Изменено имя переменной
let modalActive = false; // Инициализируем переменную для отслеживания состояния модального окна

// Добавляем обработчик события для кнопки
aboutBtn.addEventListener('click', () => {
    modalActive = !modalActive; // Изменяем состояние модального окна

    if (modalActive) {
        modal.style.display = 'block';
        setTimeout(function() {
                modal.style.opacity = 1;
                modal.style.transition = 'opacity .5s ease';
        }, 100)
    } else {
        modal.style.display = 'none';
        setTimeout(function() {
                modal.style.opacity = 0;
                modal.style.transition = 'opacity .5s ease';
        }, 100)
    }
});
talk_btn.addEventListener('click', () => {
modalActive = !modalActive; // Изменяем состояние модального окна
    
        if (modalActive) {
            modal.style.display = 'block';
            setTimeout(function() {
                    modal.style.opacity = 1;
                    modal.style.transition = 'opacity .5s ease';
            }, 100)
        } else {
            modal.style.display = 'none';
            setTimeout(function() {
                    modal.style.opacity = 0;
                    modal.style.transition = 'opacity .5s ease';
            }, 100)
        }
});
modal_btn.addEventListener('click', () => {
        modalActive = !modalActive; // Изменяем состояние модального окна
    
        if (modalActive) {
                modal.style.display = 'block';
                
        } else {
                modal.style.display = 'none';
        }
});
modal_close.addEventListener('click', () => {
        modalActive = !modalActive; // Изменяем состояние модального окна
    
        if (modalActive) {
                modal.style.display = 'block';
                
        } else {
                modal.style.display = 'none';
        }
});