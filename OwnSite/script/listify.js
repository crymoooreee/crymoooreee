const modalbtn = document.getElementById("open_modal");
const button = document.getElementById("createDivInModal");
const container = document.getElementById("container");
const modal = document.querySelector('.modal');
const close_btn = document.querySelector('.btn-close');
let modalActive = false; // Инициализируем переменную для отслеживания состояния модального окна

// Функция для загрузки div из localStorage
function loadDivs() {
    const divs = JSON.parse(localStorage.getItem("divs")) || [];
    divs.forEach((div) => {
        createDiv(div.taskName, div.message, div.completed); // Передаем состояние выполнения
    });
}

// Функция для создания нового div
function createDiv(taskName, message, completed = false) {
    const newDiv = document.createElement("div");
    newDiv.className = "new-div";

    // Создаем контейнер для названия задачи и описания
    const textContainer = document.createElement("div");
    textContainer.className = "text-container";
    textContainer.innerHTML = `<strong>${taskName}:</strong> ${message}`;

    // Создаем контейнер для чекбокса и кнопки удаления
    const actionContainer = document.createElement("div");
    actionContainer.className = "action-container";

    // Создаем контейнер для чекбокса
    const checkboxWrapper = document.createElement("label");
    checkboxWrapper.className = "toggler-wrapper";

    // Создаем чекбокс
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function (e) {
        e.stopPropagation(); // Останавливаем всплытие события
        updateTaskCompletion(taskName, message, checkbox.checked);
    });

    // Создаем слайдер для чекбокса
    const slider = document.createElement("div");
    slider.className = "toggler-slider";

    // Создаем кнопку для слайдера
    const knob = document.createElement("div");
    knob.className = "toggler-knob";

    // Собираем чекбокс
    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(slider);
    slider.appendChild(knob);

    // Создаем кнопку удаления
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete_button";
    deleteButton.id = "delete_button";

    // Добавляем обработчик события на кнопку удаления
    deleteButton.addEventListener("click", function (e) {
        e.stopPropagation(); // Останавливаем всплытие события
        container.removeChild(newDiv);
        removeDivFromStorage(taskName, message);
    });

    // Добавляем чекбокс и кнопку удаления в actionContainer
    actionContainer.appendChild(checkboxWrapper);
    actionContainer.appendChild(deleteButton);

    // Добавляем текстовый контейнер и контейнер действий в новый div
    newDiv.appendChild(textContainer);
    newDiv.appendChild(actionContainer);

    // Применяем стили в зависимости от текущей темы
    const isDarkTheme = localStorage.getItem('theme') === 'dark';
    if (isDarkTheme) {
        newDiv.style.setProperty("color", "#ffffff", "important");
        newDiv.style.setProperty("background-color", "#1d1d1d", "important");
    } else {
        newDiv.style.setProperty("color", "#1d1d1d", "important");
        newDiv.style.setProperty("background-color", "#ffffff", "important");
    }

    // Добавляем новый div в контейнер
    container.appendChild(newDiv);

    // Добавляем обработчик для предотвращения создания новых div при клике
    newDiv.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}
// Функция для обновления состояния выполнения задачи в localStorage
function updateTaskCompletion(taskName, message, completed) {
    let divs = JSON.parse(localStorage.getItem("divs")) || [];
    const task = divs.find((div) => div.taskName === taskName && div.message === message);
    if (task) {
        task.completed = completed; // Обновляем состояние выполнения
        localStorage.setItem("divs", JSON.stringify(divs));
    }
}

// Функция для удаления div из localStorage
function removeDivFromStorage(taskName, message) {
    let divs = JSON.parse(localStorage.getItem("divs")) || [];
    divs = divs.filter((div) => div.taskName !== taskName || div.message !== message);
    localStorage.setItem("divs", JSON.stringify(divs));
}

// Функция для открытия модального окна
function openModal() {
    modalActive = true;
    modal.setAttribute('style', 'display: block !important;');
    setTimeout(function() {
        modal.style.opacity = 1;
        modal.style.transition = 'opacity 1s ease';
    }, 0);
}

// Функция для закрытия модального окна
function closeModal() {
    modalActive = false;
    modal.style.opacity = 0;
    modal.style.transition = 'opacity 1s ease';
    setTimeout(function() {
        modal.setAttribute('style', 'display: none !important;');
    }, 500); // Задержка должна совпадать с временем анимации
}

// Добавляем обработчик события нажатия на кнопку "Создать"
button.addEventListener("click", function () {
    const taskName = document.getElementById("TaskName").value; // Получаем значение из поля TaskName
    const message = document .getElementById("Discription").value; // Получаем значение из поля message

    // Проверяем, что поля не пустые
    if (taskName && message) {
        createDiv(taskName, message); // Создаем новый div с данными из полей

        // Сохраняем новый div в localStorage
        const divs = JSON.parse(localStorage.getItem("divs")) || [];
        divs.push({ taskName, message, completed: false }); // Сохраняем объект с taskName, message и completed
        localStorage.setItem("divs", JSON.stringify(divs));

        closeModal(); // Закрываем модальное окно после создания div
    } else {
        alert("Пожалуйста, заполните все поля."); // Предупреждение, если поля пустые
    }
});

// Обработчик события для открытия модального окна
modalbtn.addEventListener("click", function(){
    openModal();
});

// Обработчик события для закрытия модального окна
close_btn.addEventListener('click', closeModal);

// В конце listify.js
document.addEventListener('DOMContentLoaded', () => {
    loadDivs();
    updateAllDivStyles();
});

document.addEventListener('DOMContentLoaded', function() {
    const listifyBtn = document.querySelector('.listify_btn');
    const listifyText = document.querySelector('.listify_text');

    // Устанавливаем начальное состояние элемента
    listifyText.classList.remove('visible'); // Скрываем текст при загрузке

    listifyBtn.addEventListener('click', function() {
        // Переключаем класс visible для анимации
        listifyText.classList.toggle('visible');
    });
});