const modalbtn = document.getElementById("open_modal");
const button = document.getElementById("createDivInModal");
const container = document.getElementById("container");
const modal = document.querySelector('.modal');
const close_btn = document.querySelector('.btn-close');
let modalActive = false;

function loadDivs() {
    const divs = JSON.parse(localStorage.getItem("divs")) || [];
    divs.forEach((div) => createDiv(div.taskName, div.message, div.completed));
}

function createDiv(taskName, message, completed = false) {
    const newDiv = document.createElement("div");
    newDiv.className = "new-div";

    const textContainer = document.createElement("div");
    textContainer.className = "text-container";
    textContainer.innerHTML = `<strong>${taskName}:</strong> ${message}`;

    const actionContainer = document.createElement("div");
    actionContainer.className = "action-container";

    const checkboxWrapper = document.createElement("label");
    checkboxWrapper.className = "toggler-wrapper";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", (e) => {
        e.stopPropagation();
        updateTaskCompletion(taskName, message, checkbox.checked);
    });

    const slider = document.createElement("div");
    slider.className = "toggler-slider";

    const knob = document.createElement("div");
    knob.className = "toggler-knob";

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(slider);
    slider.appendChild(knob);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete_button";
    deleteButton.id = "delete_button";
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        container.removeChild(newDiv);
        removeDivFromStorage(taskName, message);
    });

    actionContainer.appendChild(checkboxWrapper);
    actionContainer.appendChild(deleteButton);

    newDiv.appendChild(textContainer);
    newDiv.appendChild(actionContainer);

    const isDarkTheme = localStorage.getItem('theme') === 'dark';
    if (isDarkTheme) {
        newDiv.style.setProperty("color", "#ffffff", "important");
        newDiv.style.setProperty("background-color", "#1d1d1d", "important");
    } else {
        newDiv.style.setProperty("color", "#1d1d1d", "important");
        newDiv.style.setProperty("background-color", "#ffffff", "important");
    }

    container.appendChild(newDiv);
    newDiv.addEventListener('click', (e) => e.stopPropagation());
}

function updateTaskCompletion(taskName, message, completed) {
    let divs = JSON.parse(localStorage.getItem("divs")) || [];
    const task = divs.find((div) => div.taskName === taskName && div.message === message);
    if (task) {
        task.completed = completed;
        localStorage.setItem("divs", JSON.stringify(divs));
    }
}

function removeDivFromStorage(taskName, message) {
    let divs = JSON.parse(localStorage.getItem("divs")) || [];
    divs = divs.filter((div) => div.taskName !== taskName || div.message !== message);
    localStorage.setItem("divs", JSON.stringify(divs));
}

function openModal() {
    modalActive = true;
    modal.setAttribute('style', 'display: block !important;');
    setTimeout(() => {
        modal.style.opacity = 1;
        modal.style.transition = 'opacity 1s ease';
    }, 0);
}

function closeModal() {
    modalActive = false;
    modal.style.opacity = 0;
    modal.style.transition = 'opacity 1s ease';
    setTimeout(() => {
        modal.setAttribute('style', 'display: none !important;');
    }, 500);
}

button.addEventListener("click", () => {
    const taskName = document.getElementById("TaskName").value;
    const message = document.getElementById("Discription").value;

    if (taskName && message) {
        createDiv(taskName, message);

        const divs = JSON.parse(localStorage.getItem("divs")) || [];
        divs.push({ taskName, message, completed: false });
        localStorage.setItem("divs", JSON.stringify(divs));

        closeModal();
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
});

modalbtn.addEventListener("click", openModal);
close_btn.addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', () => {
    loadDivs();
    updateAllDivStyles();
});

document.addEventListener('DOMContentLoaded', () => {
    const listifyBtn = document.querySelector('.listify_btn');
    const listifyText = document.querySelector('.listify_text');

    listifyText.classList.remove('visible');

    listifyBtn.addEventListener('click', () => {
        listifyText.classList.toggle('visible');
    });
});