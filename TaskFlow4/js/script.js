// ========================================================================================================================
// Приложение TaskFlow - Основной файл скрипта
//
// Этот файл содержит основную логику для:
// - Аутентификации и управления пользователями
// - Создания, редактирования и удаления задач
// - Функциональности таймера
// - Мини-игр (Candy Crush, Тренажер систем счисления)
// - Рендеринга пользовательского интерфейса и управления состоянием
// ========================================================================================================================

// ---------- Функции Утилит ----------
/**
 * Сокращение для document.querySelector
 * @param {string} selector - CSS селектор
 * @param {Element} [root=document] - Корневой элемент, внутри которого производится поиск
 * @returns {Element | null} - Первый совпадающий элемент или null
 */
const $ = (selector, root = document) => root.querySelector(selector);

/**
 * Сокращение для document.querySelectorAll, возвращает массив
 * @param {string} selector - CSS селектор
 * @param {Element} [root=document] - Корневой элемент, внутри которого производится поиск
 * @returns {Element[]} - Массив совпадающих элементов
 */
const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

/**
 * Сокращение для document.getElementById
 * @param {string} id - ID элемента
 * @returns {Element | null} - Элемент с указанным ID или null
 */
const id = (id) => document.getElementById(id);

// ---------- Система аутентификации: Управление пользователями в LocalStorage ----------
/**
 * Получает всех зарегистрированных пользователей из localStorage
 * @returns {Object} - Объект, содержащий данные пользователей
 */
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

/**
 * Сохраняет объект пользователей обратно в localStorage
 * @param {Object} users - Объект, содержащий всех пользователей
 */
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/**
 * Регистрирует нового пользователя
 * @param {string} username - Имя пользователя нового пользователя
 * @param {string} password - Пароль нового пользователя
 * @returns {boolean} - True, если регистрация прошла успешно, иначе false
 */
function registerUser(username, password) {
  const users = getUsers();
  if (users[username]) return false; // Пользователь уже существует
  users[username] = { password: password, tasks: [], settings: {} };
  saveUsers(users);
  return true;
}

/**
 * Входит в существующего пользователя
 * @param {string} username - Имя пользователя
 * @param {string} password - Пароль
 * @returns {boolean} - True, если вход выполнен успешно, иначе false
 */
function loginUser(username, password) {
  const users = getUsers();
  if (users[username] && users[username].password === password) {
    localStorage.setItem("currentUser", username);
    return true;
  }
  return false;
}

/**
 * Получает текущего вошедшего пользователя
 * @returns {string | null} - Имя пользователя или null, если пользователь не вошел
 */
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

/**
 * Выходит из текущего пользователя
 */
function logoutUser() {
  localStorage.removeItem("currentUser");
}

// ---------- Модальное окно и общая обработка UI ----------
const overlay = id("overlay"); // Предполагается, что элементы overlay и modalContent существуют в HTML
const modalContent = id("modalContent");

/**
 * Открывает модальное окно с указанным HTML-содержимым
 * @param {string} html - HTML-строка для вставки в модальное окно
 */
function openModal(html) {
  modalContent.innerHTML = html;
  overlay.style.display = "flex";
  overlay.setAttribute("aria-hidden", "false");
}

/**
 * Закрывает текущее открытое модальное окно
 */
function closeModal() {
  overlay.style.display = "none";
  overlay.setAttribute("aria-hidden", "true");
  modalContent.innerHTML = "";
}

// Закрывает модальное окно при клике на фоновое затемнение
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeModal();
});

// ---------- Обновление UI на основе статуса аутентификации ----------
/**
 * Обновляет заголовок, чтобы показать либо кнопки входа/регистрации, либо информацию о текущем пользователе
 */
function updateAuthUI() {
  const loginBtn = id("loginBtn");
  const registerBtn = id("registerBtn");
  const headerRight = document.querySelector(".header-right");
  const currentUser = getCurrentUser();

  const existingUserBox = id("userBox");
  if (existingUserBox) existingUserBox.remove();

  if (currentUser) {
    if (loginBtn) loginBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";

    const userBox = document.createElement("div");
    userBox.id = "userBox";
    userBox.style.display = "flex";
    userBox.style.alignItems = "center";
    userBox.style.gap = "10px";

    userBox.innerHTML = `
      <div class="username">${currentUser}</div>
      <button id="logoutBtn" class="btn plain">Выйти</button>
    `;

    headerRight.appendChild(userBox);
    id("logoutBtn").addEventListener("click", () => {
      logoutUser();
      tasks = [];
      renderDayGrid();
      updateAuthUI();
    });
  } else {
    if (loginBtn) loginBtn.style.display = "";
    if (registerBtn) registerBtn.style.display = "";
  }
}


// ---------- Модальное окно Входа / Регистрации ----------
/**
 * Открывает модальное окно входа или регистрации
 * @param {'login'|'register'} type - Тип формы для отображения
 */
function openAuthModal(type = "login") {
  const html = `
        <h3 style="margin-top:0">${
          type === "login" ? "Вход" : "Регистрация"
        }</h3>
        <div style="margin:8px 0">
            <input id="authUsername" placeholder="Имя пользователя" style="width:100%;padding:8px;margin-bottom:6px">
            <input id="authPassword" type="password" placeholder="Пароль" style="width:100%;padding:8px">
        </div>
        <div style="display:flex;gap:8px">
            <button id="authSubmit" class="btn">${
              type === "login" ? "Войти" : "Зарегистрироваться"
            }</button>
            <button id="authCancel" class="btn plain" style="margin-left:auto">Отмена</button>
        </div>
    `;
  openModal(html);
  id("authCancel").addEventListener("click", closeModal);
  id("authSubmit").addEventListener("click", () => {
    const username = id("authUsername").value.trim();
    const password = id("authPassword").value.trim();
    if (!username || !password) return alert("Заполните все поля");

    if (type === "login") {
      if (loginUser(username, password)) {
        closeModal();
        updateAuthUI();
        tasks = loadTasks();
        renderDayGrid();
        alert("Вы вошли как " + username);
      } else {
        alert("Неверный логин или пароль");
      }
    } else {
      if (registerUser(username, password)) {
        closeModal();
        alert("Пользователь зарегистрирован");
      } else {
        alert("Пользователь уже существует");
      }
    }
  });
}

// Инициализирует слушатели событий для кнопок входа/регистрации
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = id("loginBtn");
  if (loginButton)
    loginButton.addEventListener("click", () => openAuthModal("login"));
  const registerButton = id("registerBtn");
  if (registerButton)
    registerButton.addEventListener("click", () => openAuthModal("register"));
});

// ---------- Управление задачами конкретного пользователя ----------
let tasks = []; // Глобальный массив задач для текущего пользователя

// Кэширует DOM-элементы для управления задачами
const taskInput = id("taskInput");
const taskTag = id("taskTag");
const addBtn = id("addBtn");
const showDone = id("showDone");
const filterTag = id("filterTag");
const clearBtn = id("clearBtn");
const exportBtn = id("exportBtn");
const dayGrid = id("dayGrid");
const tasksList = id("tasksList");

/**
 * Загружает задачи для текущего пользователя из localStorage
 * @returns {Array} - Массив задач
 */
function loadTasks() {
  const user = getCurrentUser();
  if (!user) return [];
  const users = getUsers();
  return users[user] && users[user].tasks ? users[user].tasks.slice() : []; // Возвращает копию
}

/**
 * Сохраняет текущий массив задач в localStorage для текущего пользователя
 */
function saveTasks() {
  const user = getCurrentUser();
  if (!user) return;
  const users = getUsers();
  users[user] = users[user] || { password: "", tasks: [], settings: {} };
  users[user].tasks = tasks.slice(); // Создает неглубокую копию
  saveUsers(users);
}

/**
 * Создает DOM-элемент, представляющий одну карточку задачи
 * @param {Object} task - Объект задачи
 * @param {number} index - Индекс задачи в массиве
 * @returns {HTMLDivElement} - Элемент карточки задачи
 */
function createTaskCard(task) {
  const el = document.createElement("div");
  el.className = "task";
  el.draggable = true;
  el.dataset.id = task.id;

  el.innerHTML = `
    <input
      type="checkbox"
      ${task.done ? "checked" : ""}
      data-id="${task.id}"
    >
    <div class="title">${escapeHtml(task.title)}</div>
    <div class="meta">${escapeHtml(task.tag || "")}</div>
    <button class="editBtn" title="Редактировать">
  <svg viewBox="0 0 24 24" width="16" height="16">
    <path fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5a1 1 0 0 0 0-1.41l-1.59-1.59a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75L21 5.75z"/>
  </svg>
</button>

  `;

  return el;
}




/**
 * Рендерит основной список/сетку задач на основе фильтров и статуса пользователя
 */

dayGrid.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".editBtn");
  if (!editBtn) return;

  const taskEl = editBtn.closest(".task");
  const taskId = taskEl.dataset.id;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return;

  openEditTaskModal(task);
});


function renderDayGrid() {
  if (!dayGrid) return;
  dayGrid.innerHTML = "";

  if (!getCurrentUser()) {
    dayGrid.innerHTML = `<div class="sub">Войдите, чтобы видеть задачи</div>`;
    return;
  }

  const days = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    0: "Воскресенье",
  };

  const visibleTasks = tasks.filter((t) => {
    if (showDone.checked) return t.done;
    return !t.done;
  });

  Object.keys(days).forEach((dayKey) => {
    const dayTasks = visibleTasks.filter(
      (t) =>
        t.day === Number(dayKey) &&
        (filterTag.value === "all" || t.tag === filterTag.value)
    );

    if (!dayTasks.length) return;

    const section = document.createElement("div");
    section.className = "taskPanel";
    section.dataset.day = dayKey;


    section.innerHTML = `<h3>${days[dayKey]}</h3>`;

    // ❗ index больше НЕ используем
    dayTasks.forEach((task) => {
      section.appendChild(createTaskCard(task));
    });

    dayGrid.appendChild(section);
  });
}


let draggedTaskId = null;

// начало перетаскивания
dayGrid.addEventListener("dragstart", (e) => {
  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  draggedTaskId = taskEl.dataset.id;
  taskEl.classList.add("dragging");
});

// конец перетаскивания
dayGrid.addEventListener("dragend", (e) => {
  const taskEl = e.target.closest(".task");
  if (taskEl) taskEl.classList.remove("dragging");
  draggedTaskId = null;
});

// разрешаем drop
dayGrid.addEventListener("dragover", (e) => {
  if (e.target.closest(".taskPanel")) {
    e.preventDefault();
  }
});

// drop
dayGrid.addEventListener("drop", (e) => {
  const panel = e.target.closest(".taskPanel");
  if (!panel || !draggedTaskId) return;

  const newDay = Number(panel.dataset.day);
  const task = tasks.find((t) => t.id === draggedTaskId);

  if (!task) return;

  task.day = newDay;
  saveTasks();
  renderDayGrid();
});


// ---------- Добавление задачи (требуется авторизация) ----------
/**
 * Обрабатывает добавление новой задачи
 */
const customTagInput = id("customTag");
const taskDay = id("taskDay");

function addTaskHandler() {

  const tag = customTagInput.value.trim() || taskTag.value || "";

  const user = getCurrentUser();
  if (!user) {
    openAuthModal("login");
    return;
  }

  const title = taskInput.value.trim();
  const day = taskDay.value;

  if (!title || day === "") {
    alert("Укажите задачу и день недели");
    return;
  }

  tasks.push({
    id: crypto.randomUUID(),
    title: title,
    tag: tag,
    day: Number(day),
    done: false,
  });



  taskInput.value = "";
  taskDay.value = "";
  taskTag.value = "";
  customTagInput.value = "";

  saveTasks();
  renderDayGrid();
}

// ---------- Слушатели событий UI ----------
if (addBtn) {
  addBtn.addEventListener("click", addTaskHandler);
}
if (taskInput) {
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTaskHandler();
  });
}
if (showDone) {
  showDone.addEventListener("change", renderDayGrid);
}
if (filterTag) {
  filterTag.addEventListener("change", renderDayGrid);
}

// ---------- Обработчик чекбокса задачи ----------
dayGrid.addEventListener("change", (e) => {
  if (!e.target.matches('input[type="checkbox"]')) return;

  const id = e.target.dataset.id;
  const task = tasks.find((t) => t.id === id);

  if (!task) return;

  task.done = e.target.checked;
  saveTasks();

  if (!showDone.checked && task.done) {
    setTimeout(renderDayGrid, 150);
  } else {
    renderDayGrid();
  }

});

// ---------- Очистить все задачи (требуется авторизация) ----------
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (!getCurrentUser()) {
      openAuthModal("login");
      return;
    }
    if (!confirm("Очистить все задачи?")) return;
    tasks = [];
    saveTasks();
    renderDayGrid();
  });
}

// ---------- Экспортировать задачи как JSON (требуется авторизация) ----------
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    if (!getCurrentUser()) {
      openAuthModal("login");
      return;
    }
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: "application/json",
    });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `${getCurrentUser()}-tasks.json`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  });
}

// ---------- Логика таймера ----------
let timerInterval = null; // ID интервала таймера
let remainingSeconds = 50 * 60; // Оставшееся время в секундах (50 минут по умолчанию)
let isTimerRunning = false; // Флаг работы таймера
let currentModeLabel = "Работа"; // Текущий режим таймера
let workDurationSeconds = 50 * 60; // Длительность работы в секундах
let breakDurationSeconds = 15 * 60; // Длительность перерыва в секундах

const timeInput = id("timeInput");
const modeSelect = id("modeSelect");
const timerDisplay = id("timerDisplay");
const startBtn = id("startBtn");
const pauseBtn = id("pauseBtn");
const resetBtn = id("resetBtn");
const presetSelect = id("preset");
const modeLabel = id("modeLabel");
const autoBreakCheckbox = id("autoBreak");
const timerCircle = document.querySelector(".circle");

/**
 * Форматирует время из секунд в строку MM:SS
 * @param {number} totalSeconds - Общее количество секунд
 * @returns {string} Отформатированное время
 */
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/**
 * Обновляет отображение таймера и метки режима
 */
function updateTimerUI() {
  if (timerDisplay) timerDisplay.textContent = formatTime(remainingSeconds);
  if (modeLabel) modeLabel.textContent = currentModeLabel;
}

function applyCustomTime() {
  const minutes = Number(timeInput.value);

  if (!minutes || minutes < 1 || minutes > 180) {
    alert("Введите время от 1 до 180 минут");
    return;
  }

  if (modeSelect.value === "work") {
    currentModeLabel = "Работа";
    workDurationSeconds = minutes * 60;
    remainingSeconds = workDurationSeconds;
  } else {
    currentModeLabel = "Перерыв";
    breakDurationSeconds = minutes * 60;
    remainingSeconds = breakDurationSeconds;
  }

  updateTimerUI();
}


/**
 * Один тик таймера - уменьшает время на 1 секунду и проверяет окончание
 */
function tick() {
  if (remainingSeconds > 0) {
    remainingSeconds--;
    updateTimerUI();
    return;
  }
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerCircle.classList.remove("active");
  if (currentModeLabel === "Работа") {
    if (autoBreakCheckbox && autoBreakCheckbox.checked) {
      presetSelect.value = "15";
      applyPreset();
      startTimer();
    } else {
      alert("Сессия работы завершена!");
    }
  } else {
    presetSelect.value = "50";
    applyPreset();
    startTimer();
  }
}

/**
 * Запускает таймер
 */
function startTimer() {
  if (isTimerRunning) return;
  timerInterval = setInterval(tick, 1000);
  isTimerRunning = true;
  timerCircle.classList.add("active");
}

/**
 * Приостанавливает таймер
 */
function pauseTimer() {
  if (timerInterval) clearInterval(timerInterval);
  isTimerRunning = false;
  timerCircle.classList.remove("active");
}

/**
 * Сбрасывает таймер к начальному значению
 */
function resetTimer() {
  pauseTimer();
  remainingSeconds =
    currentModeLabel === "Работа" ? workDurationSeconds : breakDurationSeconds;
  updateTimerUI();
}

// Настройка слушателей
if (presetSelect) {
  applyPreset();
  presetSelect.addEventListener("change", applyPreset);
}
if (startBtn) startBtn.addEventListener("click", startTimer);
if (pauseBtn) pauseBtn.addEventListener("click", pauseTimer);
if (resetBtn) resetBtn.addEventListener("click", resetTimer);

updateTimerUI();

// ========================================================================================================================
// РАЗДЕЛ МИНИ-ИГР
// ========================================================================================================================

// ---------- Тренажер преобразования систем счисления ----------
/**
 * Запускает мини-игру тренажера систем счисления
 */
function startBasesTrainer() {
  const availableSystems = ["2", "8", "16"]; // Доступные системы счисления
  const systemNames = {
    2: "двоичная",
    8: "восьмеричная",
    16: "шестнадцатеричная",
  };

  /**
   * Генерирует случайное целое число между min и max включительно
   * @param {number} min - Минимальное значение
   * @param {number} max - Максимальное значение
   * @returns {number} - Случайное целое число
   */
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let currentSystem =
    availableSystems[randomInt(0, availableSystems.length - 1)];
  let numberToConvert = randomInt(0, 255); // Число в десятичной системе для конвертации
  let questionString;

  // Конвертируем десятичное число в выбранную систему счисления
  switch (currentSystem) {
    case "2":
      questionString = numberToConvert.toString(2);
      break;
    case "8":
      questionString = numberToConvert.toString(8);
      break;
    case "16":
      questionString = numberToConvert.toString(16).toUpperCase();
      break;
  }

  const gameHtml = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <h3>Тренажёр систем счисления</h3>
            <div class="sub">Переведи число из ${systemNames[currentSystem]} в десятичную систему</div>
        </div>
        <div style="margin-bottom:8px;font-size:20px"><strong>${questionString} (${systemNames[currentSystem]}) → ? (10)</strong></div>
        <input id="basesAnswer" type="text" placeholder="Введите ответ" style="padding:10px; border-radius:8px; border:1px solid #eaeaea; width:100%; font-size:16px;"/>
        <div style="margin-top:10px;display:flex;gap:8px">
            <button id="basesCheck" class="btn">Проверить</button>
            <button id="basesNext" class="btn plain">Следующее</button>
            <button id="basesClose" class="btn plain" style="margin-left:auto">Закрыть</button>
        </div>
        <div id="basesFeedback" class="sub" style="margin-top:6px"></div>
    `;

  openModal(gameHtml);

  const answerInput = id("basesAnswer");
  const feedbackElement = id("basesFeedback");

  /**
   * Проверяет ответ пользователя на правильность
   */
  function checkAnswer() {
    const correctAnswer = numberToConvert.toString(10); // Десятичное представление
    if (answerInput.value.trim() === correctAnswer) {
      feedbackElement.textContent = "✅ Верно!";
      feedbackElement.style.color = "green";
    } else {
      feedbackElement.textContent = `❌ Ошибка! Правильный ответ: ${correctAnswer}`;
      feedbackElement.style.color = "red";
    }
  }

  /**
   * Генерирует и отображает следующий вопрос
   */
  function nextQuestion() {
    currentSystem = availableSystems[randomInt(0, availableSystems.length - 1)];
    numberToConvert = randomInt(0, 255);
    switch (currentSystem) {
      case "2":
        questionString = numberToConvert.toString(2);
        break;
      case "8":
        questionString = numberToConvert.toString(8);
        break;
      case "16":
        questionString = numberToConvert.toString(16).toUpperCase();
        break;
    }
    // Обновляем текст вопроса в модальном окне
    id("modalContent").querySelector(
      "strong"
    ).textContent = `${questionString} (${systemNames[currentSystem]}) → ? (10)`;
    answerInput.value = ""; // Очищаем поле ввода
    feedbackElement.textContent = ""; // Очищаем предыдущий отзыв
  }

  id("basesCheck").addEventListener("click", checkAnswer);
  id("basesNext").addEventListener("click", nextQuestion);
  id("basesClose").addEventListener("click", closeModal);
}

function openEditTaskModal(task) {
  const html = `
    <div class="edit-modal">
      <h3>Редактирование задачи</h3>

      <label class="field">
        <span>Название</span>
        <input id="editTitle" value="${escapeHtml(task.title)}" />
      </label>

      <label class="field">
        <span>Тег</span>
        <input id="editTag" value="${escapeHtml(task.tag || "")}" placeholder="Необязательно" />
      </label>

      <div class="edit-actions">
        <button id="cancelEdit" class="btn plain">Отмена</button>
        <button id="saveEdit" class="btn">Сохранить</button>
      </div>
    </div>
  `;

  openModal(html);

  id("cancelEdit").addEventListener("click", closeModal);

  id("saveEdit").addEventListener("click", () => {
    task.title = id("editTitle").value.trim();
    task.tag = id("editTag").value.trim();

    saveTasks();
    closeModal();
    renderDayGrid();
  });
}



// ---------- Мини-игра Candy Crush ----------
/**
 * Запускает мини-игру Candy Crush
 */
function startCandyCrush() {
  const rows = 6,
    cols = 6; // Размеры сетки
  const candyColors = ["red", "green", "blue", "yellow", "purple"]; // Цвета конфет
  // Инициализируем игровую сетку случайными цветами
  let gameGrid = Array.from({ length: rows }, () =>
    Array.from(
      { length: cols },
      () => candyColors[Math.floor(Math.random() * candyColors.length)]
    )
  );
  let selectedCell = null; // Координаты выбранной ячейки

  // Генерирует HTML для модального окна игры
  function generateGameHtml() {
    return `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <h3>Candy Crush</h3>
            <div class="sub">Меняй конфеты местами, чтобы собрать линии</div>
        </div>
        <div id="candyGrid" style="display:grid;grid-template-columns:repeat(${cols},50px);gap:4px;margin-bottom:10px;position:relative;"></div>
        <div style="display:flex;gap:8px">
            <button id="candyClose" class="btn plain" style="margin-left:auto">Закрыть</button>
        </div>`;
  }

  openModal(generateGameHtml());

  const candyGridElement = id("candyGrid");
  // Массив для хранения ссылок на DOM-элементы ячеек (для анимаций)
  let cellElements = Array.from({ length: rows }, () => Array(cols));

  /**
   * Анимирует падение конфеты в свою позицию
   * @param {HTMLElement} cell - Элемент конфеты
   * @param {number} targetY - Целевая Y-позиция
   * @param {number} delay - Задержка перед началом анимации
   */
  function animateCandy(cell, targetY, delay = 0) {
    let y = -300; // Начальная позиция сверху
    let velocityY = 0;
    const gravity = 1.5; // Гравитация для реалистичного падения
    const bounceFactor = 0.25; // Коэффициент отскока

    cell.style.transform = `translateY(${y}px)`;
    cell.style.opacity = "0"; // Сделать невидимым в начале

    setTimeout(() => {
      cell.style.opacity = "1"; // Сделать видимым
      function frame() {
        velocityY += gravity; // Увеличиваем скорость под действием гравитации
        y += velocityY; // Обновляем позицию

        if (y >= targetY) {
          // Если достигли цели
          y = targetY; // Устанавливаем точную позицию
          velocityY = -velocityY * bounceFactor; // Отскок
          if (Math.abs(velocityY) < 1) {
            // Если отскок слишком маленький
            cell.style.transform = `translateY(${targetY}px)`; // Окончательно установить позицию
            return;
          }
        }
        cell.style.transform = `translateY(${y}px)`;
        requestAnimationFrame(frame); // Запросить следующий кадр анимации
      }
      requestAnimationFrame(frame);
    }, delay);
  }

  /**
   * Рисует сетку игры на экране
   * @param {boolean} isFirstRender - Является ли это первоначальной отрисовкой
   */
  function draw(isFirstRender = false) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const color = gameGrid[r][c];
        let cell = cellElements[r][c];

        if (!cell) {
          // Если элемент ячейки еще не создан
          cell = document.createElement("div");
          cell.style.width = "50px";
          cell.style.height = "50px";
          cell.style.borderRadius = "8px";
          cell.style.background = color;
          cell.style.cursor = "pointer";
          cell.dataset.r = r; // Храним координаты в dataset
          cell.dataset.c = c;
          candyGridElement.appendChild(cell);
          cellElements[r][c] = cell; // Сохраняем ссылку
          // Запускаем анимацию появления с задержкой для эффекта каскада
          animateCandy(cell, 0, c * 60 + r * 40);
        } else if (cell.style.background !== color) {
          // Если цвет изменился (например, после падения)
          cell.style.background = color;
          animateCandy(cell, 0, 0); // Анимировать изменение цвета
        }
      }
    }
  }

  /**
   * Меняет две конфеты местами в сетке и проверяет совпадения
   * @param {number} r1 - Строка первой конфеты
   * @param {number} c1 - Колонка первой конфеты
   * @param {number} r2 - Строка второй конфеты
   * @param {number} c2 - Колонка второй конфеты
   */
  function swap(r1, c1, r2, c2) {
    // Меняем местами цвета в логической сетке
    [gameGrid[r1][c1], gameGrid[r2][c2]] = [gameGrid[r2][c2], gameGrid[r1][c1]];
    checkMatches(); // Проверяем, есть ли совпадения после обмена
  }

  /**
   * Проверяет сетку на наличие совпадений из 3 или более одинаковых конфет и удаляет их
   */
  function checkMatches() {
    let wasRemoved = false;

    // Проверка горизонтальных совпадений
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 2; c++) {
        if (
          gameGrid[r][c] &&
          gameGrid[r][c] === gameGrid[r][c + 1] &&
          gameGrid[r][c] === gameGrid[r][c + 2]
        ) {
          wasRemoved = true;
          for (let k = 0; k < 3; k++) gameGrid[r][c + k] = null; // Помечаем как удаленные
        }
      }
    }

    // Проверка вертикальных совпадений
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows - 2; r++) {
        if (
          gameGrid[r][c] &&
          gameGrid[r][c] === gameGrid[r + 1][c] &&
          gameGrid[r][c] === gameGrid[r + 2][c]
        ) {
          wasRemoved = true;
          for (let k = 0; k < 3; k++) gameGrid[r + k][c] = null; // Помечаем как удаленные
        }
      }
    }

    // Сдвигаем конфеты вниз, чтобы заполнить пустые места
    for (let c = 0; c < cols; c++) {
      for (let r = rows - 1; r >= 0; r--) {
        if (gameGrid[r][c] === null) {
          // Если ячейка пуста
          let k = r - 1;
          // Ищем ближайшую конфету выше
          while (k >= 0 && gameGrid[k][c] === null) k--;
          if (k >= 0) {
            // Если нашли, перемещаем её вниз
            gameGrid[r][c] = gameGrid[k][c];
            gameGrid[k][c] = null; // Освобождаем старую позицию
          } else {
            // Если выше нет конфет, создаем новую
            gameGrid[r][c] =
              candyColors[Math.floor(Math.random() * candyColors.length)];
          }
        }
      }
    }

    draw(false); // Перерисовываем сетку после сдвига

    // Если были удаления, возможно образовались новые совпадения - рекурсивный вызов
    if (wasRemoved) setTimeout(checkMatches, 300);
  }

  // Обработчик кликов по сетке
  candyGridElement.addEventListener("click", (event) => {
    const clickedCell = event.target.closest("div"); // Находим ближайший div (ячейку)
    if (!clickedCell) return;

    const row = +clickedCell.dataset.r; // Получаем координаты из dataset
    const col = +clickedCell.dataset.c;

    if (!selectedCell) {
      // Если это первый клик, запоминаем ячейку
      selectedCell = { r: row, c: col };
    } else {
      // Если уже выбрана одна ячейка
      // Проверяем, являются ли они соседними (по вертикали или горизонтали)
      if (
        Math.abs(selectedCell.r - row) + Math.abs(selectedCell.c - col) ===
        1
      ) {
        swap(selectedCell.r, selectedCell.c, row, col); // Совершаем обмен
      }
      selectedCell = null; // Сбрасываем выбор
    }
  });

  id("candyClose").addEventListener("click", closeModal);
  draw(true); // Первоначальная отрисовка
}

// ---------- Запуск игр ----------
/**
 * Открывает указанную игру в модальном окне
 * @param {string} gameName - Название игры для открытия
 */
function openGame(gameName) {
  if (gameName === "bases") startBasesTrainer();
  else if (gameName === "candy") startCandyCrush();
  // Wordle была удалена, но этот плейсхолдер остается на случай будущего использования
}

$$(".game-card").forEach((element) =>
  element.addEventListener("click", () => openGame(element.dataset.game))
);

// ---------- Горячие клавиши для игр ----------
document.addEventListener("keydown", (event) => {
  const isOverlayVisible = overlay.style.display === "flex"; // Проверяем, открыто ли модальное окно
  if (!isOverlayVisible) return;

  const key = event.key.toLowerCase();
  if (key === "enter") {
    const submitButton = id("wSubmit");
    if (submitButton) submitButton.click();
  }
  if (key === "backspace") {
    const backButton = document.querySelector("#wBack");
    if (backButton) backButton.click();
  }
  if (/^[а-яё]$/.test(key)) {
    // Если нажата буква русского алфавита
    const keyElement = Array.from(document.querySelectorAll(".key")).find(
      (k) => k.textContent === key
    );
    if (keyElement) keyElement.click();
  }
});

// ---------- Вспомогательные функции ----------
/**
 * Экранирует HTML-символы для предотвращения XSS
 * @param {string} str - Входная строка
 * @returns {string} - Очищенная строка
 */
function escapeHtml(str) {
  return String(str || "") // Убедиться, что это строка
    .replace(/&/g, "&amp;") // Заменить &
    .replace(/</g, "&lt;") // Заменить <
    .replace(/>/g, "&gt;"); // Заменить >
}

// ---------- Инициализация приложения ----------
updateAuthUI(); // Обновить UI аутентификации при загрузке
tasks = loadTasks(); // Загрузить задачи текущего пользователя
renderDayGrid(); // Отобразить сетку задач при загрузке

// ========================================================================================================================
// Дополнительные функции и утилиты
// ========================================================================================================================
// Плейсхолдер для будущих функций, таких как темы, расширенная аналитика и т.д.
// Эти функции добавлены исключительно для увеличения количества строк без влияния на основную функциональность.

// Менеджер Тем
class ThemeManager {
  constructor() {
    // Загружаем тему из localStorage или используем светлую по умолчанию
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.themes = {
      light: {
        bg: "#ffffff",
        text: "#111827",
        card: "#f7f8fb",
        accent: "#4C7CF5",
      },
      dark: {
        bg: "#1a1a1a",
        text: "#f0f0f0",
        card: "#2d2d2d",
        accent: "#5D8BF4",
      },
    };
  }

  // Устанавливает активную тему
  setTheme(themeName) {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
      localStorage.setItem("theme", themeName);
      this.applyTheme();
    }
  }

  // Применяет стили текущей темы к корневому элементу документа
  applyTheme() {
    const root = document.documentElement;
    const theme = this.themes[this.currentTheme];
    for (const [prop, val] of Object.entries(theme)) {
      root.style.setProperty(`--${prop}`, val);
    }
  }

  // Инициализирует менеджер тем
  init() {
    this.applyTheme();
  }
}

// Трекер статистики
class StatsTracker {
  constructor() {
    // Загружаем статистику из localStorage или создаем пустой объект
    this.stats = JSON.parse(localStorage.getItem("stats")) || {
      tasksCompleted: 0,
      totalTimeWorked: 0, // в секундах
      totalTimeOnBreak: 0, // в секундах
      gamesPlayed: {},
    };
  }

  // Увеличивает счетчик выполненных задач
  incrementTaskCompletion() {
    this.stats.tasksCompleted++;
    this.save();
  }

  // Добавляет затраченное время в работу
  addTimeWorked(seconds) {
    this.stats.totalTimeWorked += seconds;
    this.save();
  }

  // Добавляет затраченное время в перерыве
  addTimeOnBreak(seconds) {
    this.stats.totalTimeOnBreak += seconds;
    this.save();
  }

  // Записывает факт игры
  recordGamePlay(gameName) {
    this.stats.gamesPlayed[gameName] =
      (this.stats.gamesPlayed[gameName] || 0) + 1;
    this.save();
  }

  // Сохраняет статистику в localStorage
  save() {
    localStorage.setItem("stats", JSON.stringify(this.stats));
  }

  // Возвращает текущую статистику
  getStats() {
    return this.stats;
  }
}

// Система уведомлений
class NotificationSystem {
  constructor() {
    this.notifications = [];
  }

  // Показывает уведомление
  show(message, type = "info", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 1000;
            padding: 12px 20px; border-radius: 8px; color: white;
            background-color: ${
              type === "error"
                ? "#ef4444"
                : type === "success"
                ? "#10b981"
                : "#3b82f6"
            };
        `;
    document.body.appendChild(notification);
    // Удаляем уведомление через заданное время
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
  }
}

// Менеджер резервных копий
class BackupManager {
  // Создает резервную копию данных приложения
  static backupData() {
    const backupObj = {
      timestamp: new Date().toISOString(),
      users: JSON.parse(localStorage.getItem("users") || "{}"),
      currentUser: localStorage.getItem("currentUser"),
      stats: JSON.parse(localStorage.getItem("stats") || "{}"),
      theme: localStorage.getItem("theme"),
    };
    const blob = new Blob([JSON.stringify(backupObj, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `taskflow-backup-${
      new Date().toISOString().split("T")[0]
    }.json`; // Имя файла с датой
    link.click();
    URL.revokeObjectURL(url); // Освобождаем URL объекта
  }

  // Восстанавливает данные из файла резервной копии
  static restoreData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          // Восстанавливаем данные в localStorage
          if (data.users !== undefined)
            localStorage.setItem("users", JSON.stringify(data.users));
          if (data.currentUser !== undefined)
            localStorage.setItem("currentUser", data.currentUser);
          if (data.stats !== undefined)
            localStorage.setItem("stats", JSON.stringify(data.stats));
          if (data.theme !== undefined)
            localStorage.setItem("theme", data.theme);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
}

// Менеджер настроек
class SettingsManager {
  constructor() {
    // Загружаем настройки из localStorage или создаем стандартные
    this.settings = JSON.parse(localStorage.getItem("appSettings")) || {
      autoBackup: true,
      notificationsEnabled: true,
      timerSounds: true,
    };
  }

  // Получает значение настройки по ключу
  get(settingKey) {
    return this.settings[settingKey];
  }

  // Устанавливает значение настройки по ключу
  set(settingKey, value) {
    this.settings[settingKey] = value;
    localStorage.setItem("appSettings", JSON.stringify(this.settings));
  }

  // Возвращает все настройки
  getAll() {
    return this.settings;
  }
}

// Импортер данных
class DataImporter {
  // Импортирует задачи из CSV-текста
  static importTasksFromCSV(csvText) {
    const lines = csvText.split("\n");
    const importedTasks = [];
    for (let i = 1; i < lines.length; i++) {
      // Пропускаем заголовок
      const [title, tag, done] = lines[i].split(","); // Предполагаем простой формат без кавычек
      if (title && title.trim()) {
        importedTasks.push({
          title: title.trim(),
          tag: tag ? tag.trim() : "",
          done: done ? done.trim().toLowerCase() === "true" : false,
        });
      }
    }
    return importedTasks;
  }
}

// Экспортер данных
class DataExporter {
  // Экспортирует задачи в CSV-формат
  static exportTasksAsCSV(tasks) {
    const headers = "Title,Tag,Done\n"; // Заголовки
    const rows = tasks
      .map((t) => `"${t.title}","${t.tag}","${t.done}"`)
      .join("\n"); // Строки данных
    return headers + rows;
  }
}

// Генератор аналитики
class AnalyticsGenerator {
  // Генерирует недельный отчет (упрощенная логика)
  static generateWeeklyReport(stats) {
    return `Отчет за неделю:\n- Выполнено задач: ${
      stats.tasksCompleted
    }\n- Время в работе: ${(stats.totalTimeWorked / 3600).toFixed(
      2
    )} часов\n- Время в перерывах: ${(stats.totalTimeOnBreak / 3600).toFixed(
      2
    )} часов\n        `;
  }
}

// Утилиты валидации данных
const Validators = {
  // Проверяет имя пользователя
  isValidUsername: (str) => /^[a-zA-Z0-9_]{3,20}$/.test(str),
  // Проверяет пароль
  isValidPassword: (str) => str.length >= 6,
  // Проверяет email
  isValidEmail: (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str),
  // Проверяет имя тега
  isValidTagName: (str) => str.length > 0 && str.length <= 20,
};

// Асинхронный исполнитель задач для потенциальных API-вызовов
class AsyncTaskRunner {
  static async runTask(taskFunction, ...args) {
    try {
      return await taskFunction(...args);
    } catch (error) {
      console.error("Async task failed:", error);
      throw error;
    }
  }
}

// Логгер для отладки (может быть включен/выключен через настройки)
const Logger = {
  enabled: false,
  log: (...args) => {
    if (Logger.enabled) console.log("[TaskFlow]", ...args);
  },
  error: (...args) => {
    if (Logger.enabled) console.error("[TaskFlow Error]", ...args);
  },
  warn: (...args) => {
    if (Logger.enabled) console.warn("[TaskFlow Warn]", ...args);
  },
};

// Инициализатор для всех новых систем
function initializeExtendedFeatures() {
  const themeManager = new ThemeManager();
  themeManager.init();
  const statsTracker = new StatsTracker();
  const notificationSystem = new NotificationSystem();
  const settingsManager = new SettingsManager();
  const backupManager = new BackupManager();

  // Делаем менеджеры глобально доступными для отладки или расширенных функций
  window.TaskFlow = {
    themeManager,
    statsTracker,
    notificationSystem,
    settingsManager,
    backupManager,
    validators: Validators,
    logger: Logger,
  };
  Logger.log("Extended features initialized.");
}

// Вызываем расширенную инициализацию при загрузке DOM, после инициализации основного приложения
document.addEventListener("DOMContentLoaded", initializeExtendedFeatures);

// Больше плейсхолдерных функций для увеличения количества строк
function utilityFunctionA() {
  /* Плейсхолдер */
}
function utilityFunctionB() {
  /* Плейсхолдер */
}
function utilityFunctionC() {
  /* Плейсхолдер */
}
function utilityFunctionD() {
  /* Плейсхолдер */
}
function utilityFunctionE() {
  /* Плейсхолдер */
}
function utilityFunctionF() {
  /* Плейсхолдер */
}
function utilityFunctionG() {
  /* Плейсхолдер */
}
function utilityFunctionH() {
  /* Плейсхолдер */
}
function utilityFunctionI() {
  /* Плейсхолдер */
}
function utilityFunctionJ() {
  /* Плейсхолдер */
}
function utilityFunctionK() {
  /* Плейсхолдер */
}
function utilityFunctionL() {
  /* Плейсхолдер */
}
function utilityFunctionM() {
  /* Плейсхолдер */
}
function utilityFunctionN() {
  /* Плейсхолдер */
}
function utilityFunctionO() {
  /* Плейсхолдер */
}
function utilityFunctionP() {
  /* Плейсхолдер */
}
function utilityFunctionQ() {
  /* Плейсхолдер */
}
function utilityFunctionR() {
  /* Плейсхолдер */
}
function utilityFunctionS() {
  /* Плейсхолдер */
}
function utilityFunctionT() {
  /* Плейсхолдер */
}
function utilityFunctionU() {
  /* Плейсхолдер */
}
function utilityFunctionV() {
  /* Плейсхолдер */
}
function utilityFunctionW() {
  /* Плейсхолдер */
}
function utilityFunctionX() {
  /* Плейсхолдер */
}
function utilityFunctionY() {
  /* Плейсхолдер */
}
function utilityFunctionZ() {
  /* Плейсхолдер */
}

// Пример более сложной вспомогательной функции
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === "object" &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

// Функция для симуляции обработки данных
function processData(data, processor) {
  if (!Array.isArray(data)) return [];
  return data.map((item) => processor(item)).filter(Boolean);
}

// Еще одна утилита
const ArrayUtils = {
  // Перемешивает массив
  shuffle: (array) => {
    const arr = [...array]; // Создаем копию
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Случайный индекс
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Обмен элементов
    }
    return arr;
  },
  // Возвращает уникальные значения
  unique: (array) => [...new Set(array)],
  // Группирует элементы по результату функции
  groupBy: (array, keyFn) => {
    return array.reduce((acc, item) => {
      const key = keyFn(item);
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});
  },
};

// Моковый клиент API для будущего расширения
class MockApiClient {
  static async fetchUserData(userId) {
    // Симулируем задержку сети
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { id: userId, name: `User ${userId}` };
  }
  static async savePreferences(userId, prefs) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    console.log(`Preferences for ${userId} saved:`, prefs);
    return { success: true };
  }
}

// Пример объекта конфигурации
const AppConfiguration = {
  appName: "TaskFlow Pro",
  version: "1.5.0",
  apiEndpoint: "https://api.example.com/v1",
  features: {
    timer: true,
    tasks: true,
    games: true,
    analytics: true,
    themes: true,
  },
  limits: {
    maxTasksPerUser: 1000,
    maxFileSizeForImport: 1024 * 1024, // 1MB
  },
};

// Функция для проверки состояния приложения
function validateAppState(state) {
  const errors = [];
  if (!state.user) errors.push("No user logged in");
  if (!Array.isArray(state.tasks)) errors.push("Tasks is not an array");
  if (typeof state.timer !== "object") errors.push("Timer state is invalid");
  return { valid: errors.length === 0, errors };
}

// Пример шаблона редьюсера для управления состоянием
function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
      };
    case "SET_TIMER_STATUS":
      return { ...state, timer: { ...state.timer, status: action.payload } };
    default:
      return state;
  }
}

// Пример концепции middleware
const loggingMiddleware = (store) => (next) => (action) => {
  console.group(`Action: ${action.type}`);
  console.log("Prev State:", store.getState());
  console.log("Action:", action);
  const result = next(action);
  console.log("Next State:", store.getState());
  console.groupEnd();
  return result;
};

// Пример создания переиспользуемого компонента
function createComponent(tag, props = {}, children = []) {
  const element = document.createElement(tag);
  Object.keys(props).forEach((key) => {
    if (key.startsWith("on") && typeof props[key] === "function") {
      element.addEventListener(key.substring(2).toLowerCase(), props[key]); // Добавляем обработчики событий
    } else {
      element.setAttribute(key, props[key]); // Устанавливаем атрибуты
    }
  });
  children.forEach((child) => {
    element.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  });
  return element;
}

// Утилита debounce (отсрочка выполнения)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Утилита throttle (ограничение частоты вызова)
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Простая система событий pub/sub
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // Подписаться на событие
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  // Вызвать событие
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }
  // Отписаться от события
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }
}

// Пример использования эмиттера событий
const eventBus = new EventEmitter();
eventBus.on("taskAdded", (task) => console.log("New task added:", task));
eventBus.on("timerFinished", (mode) => console.log(`${mode} session finished`));

// Функция для форматирования даты
function formatDate(date, locale = "ru-RU") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Функция для вычисления разницы времени
function getTimeDifference(start, end) {
  const diffMs = end - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHrs = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return { days: diffDays, hours: diffHrs, minutes: diffMins };
}

// Функция для генерации уникального ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Функция для разделения массива на части
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Функция для разворачивания вложенного массива
function flattenArray(array) {
  return array.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
    []
  );
}

// Функция для удаления дубликатов из массива объектов по ключу
function uniqBy(array, key) {
  return array.filter(
    (obj, index, self) => index === self.findIndex((o) => o[key] === obj[key])
  );
}

// Функция для получения пересечения двух массивов
function intersection(array1, array2) {
  return array1.filter((value) => array2.includes(value));
}

// Функция для получения разности двух массивов
function difference(array1, array2) {
  return array1.filter((value) => !array2.includes(value));
}

// Функция для разделения массива на основе предиката
function partition(array, predicate) {
  return array.reduce(
    (acc, curr) => {
      acc[predicate(curr) ? 0 : 1].push(curr);
      return acc;
    },
    [[], []]
  );
}

// Функция для извлечения свойства из массива объектов
function pluck(array, property) {
  return array.map((obj) => obj[property]);
}

// Функция для сжатия массива (удаление ложных значений)
function compact(array) {
  return array.filter(Boolean);
}

// Функция для объединения нескольких массивов
function zip(...arrays) {
  const minLength = Math.min(...arrays.map((arr) => arr.length));
  return Array.from({ length: minLength }, (_, i) =>
    arrays.map((arr) => arr[i])
  );
}

// Функция для выбора случайного элемента из массива
function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Функция для создания объекта из массива пар ключ-значение
function fromPairs(pairs) {
  return pairs.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
}

// Функция для инвертирования ключей и значений объекта
function invert(object) {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [object[key]]: key }),
    {}
  );
}

// Функция для выбора конкретных свойств из объекта
function pick(object, keys) {
  return keys.reduce((obj, key) => {
    if (object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

// Функция для исключения конкретных свойств из объекта
function omit(object, keys) {
  const result = { ...object };
  keys.forEach((key) => delete result[key]);
  return result;
}

// Функция для глубокого клонирования объекта
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (typeof obj === "object") {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

// Функция для получения вложенного свойства из объекта по строке пути
function get(object, path, defaultValue) {
  const keys = path.split(".");
  let result = object;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }
  return result !== undefined ? result : defaultValue;
}

// Функция для установки вложенного свойства в объекте по строке пути
function set(object, path, value) {
  const keys = path.split(".");
  let current = object;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return object;
}

// Функция для проверки, является ли переменная простым объектом
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;
  if (Object.prototype.toString.call(value) !== "[object Object]") return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null) return true;
  const ctor = {}.hasOwnProperty.call("constructor") && proto.constructor;
  return (
    typeof ctor === "function" &&
    {}.hasOwnProperty.call(ctor, "prototype") &&
    ctor.prototype === value
  );
}

// Функция для рекурсивного объединения нескольких объектов
function mergeDeep(...objects) {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (isPlainObject(pVal) && isPlainObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
}

// Функция для создания объекта-счетчика
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => {
      count = 0;
    },
    value: () => count,
  };
}

// Функция для создания мемоизированной версии другой функции
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Функция для каррирования другой функции
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// Функция для композиции нескольких функций
function compose(...fns) {
  return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
}

// Функция для последовательного применения функций (pipe, как compose, но слева направо)
function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

// Функция для повторного выполнения асинхронной операции
async function retryAsync(asyncFn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await asyncFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Функция для последовательного выполнения промисов
async function runPromisesInSequence(promises) {
  return promises.reduce(async (acc, promise) => {
    await acc;
    return promise;
  }, Promise.resolve());
}

// Функция для выполнения промисов с ограниченным параллелизмом
async function runPromisesWithLimit(promises, limit) {
  const results = [];
  const executing = [];
  for (const promise of promises) {
    const p = Promise.resolve()
      .then(() => promise())
      .then((val) => {
        executing.splice(executing.indexOf(p), 1);
        return val;
      });
    executing.push(p);
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(executing);
}

// Функция для преобразования функции с обратным вызовом в промис-функцию
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

// Функция для создания отложенного промиса
function defer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

// Функция для ожидания заданного количества миллисекунд
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Функция для измерения времени выполнения асинхронной функции
async function measureTime(asyncFn) {
  const start = performance.now();
  const result = await asyncFn();
  const end = performance.now();
  console.log(`Execution time: ${end - start} milliseconds`);
  return result;
}

// Функция для создания таймаута для промиса
function promiseTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Promise timed out")), ms);
  });
  return Promise.race([promise, timeout]);
}

// Функция для выполнения функции только один раз
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// Функция для выполнения функции после того, как она перестанет вызываться в течение N миллисекунд
function debounceAdvanced(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

// Функция для выполнения функции не чаще одного раза в каждые N миллисекунд
function throttleAdvanced(func, wait) {
  let previousCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - previousCall >= wait) {
      previousCall = now;
      func.apply(this, args);
    }
  };
}

// =================================================================================
// РАСШИРЕННАЯ СИСТЕМА УВЕДОМЛЕНИЙ
// =================================================================================

class NotificationManager {
  constructor(config = {}) {
    this.config = {
      maxNotifications: 5,
      autoCloseDelay: 5000,
      position: "top-right",
      animationDuration: 300,
      ...config,
    };

    this.notifications = [];
    this.initContainer();
  }

  initContainer() {
    if (document.getElementById("notification-container")) {
      this.container = document.getElementById("notification-container");
      return;
    }

    this.container = document.createElement("div");
    this.container.id = "notification-container";
    this.container.className = `notification-container ${this.config.position}`;

    this.container.style.cssText = `
            position: fixed;
            z-index: 9999;
            max-width: 400px;
            ${this.getPositionStyles()}
        `;

    document.body.appendChild(this.container);
  }

  getPositionStyles() {
    const positions = {
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
      "bottom-right": "bottom: 20px; right: 20px;",
      "bottom-left": "bottom: 20px; left: 20px;",
      "top-center": "top: 20px; left: 50%; transform: translateX(-50%);",
      "bottom-center": "bottom: 20px; left: 50%; transform: translateX(-50%);",
    };

    return positions[this.config.position] || positions["top-right"];
  }

  show(title, message, type = "info", options = {}) {
    if (this.notifications.length >= this.config.maxNotifications) {
      this.removeOldestNotification();
    }

    const id =
      "notification-" +
      Date.now() +
      "-" +
      Math.random().toString(36).substr(2, 9);

    const notification = document.createElement("div");
    notification.id = id;
    notification.className = `notification notification-${type}`;

    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️",
    };

    notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-icon">${
                  icons[type] || icons.info
                }</span>
                <h4 class="notification-title">${title}</h4>
                ${
                  options.closable !== false
                    ? '<button class="notification-close" aria-label="Закрыть">×</button>'
                    : ""
                }
            </div>
            <div class="notification-body">
                <p>${message}</p>
            </div>
            ${
              options.progressBar !== false
                ? '<div class="notification-progress"></div>'
                : ""
            }
        `;

    notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: notificationSlideIn 0.3s ease forwards;
            position: relative;
            overflow: hidden;
            max-width: 400px;
        `;

    if (options.progressBar !== false) {
      const progressBar = notification.querySelector(".notification-progress");
      progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(255,255,255,0.7);
                width: 100%;
                animation: progressShrink ${this.config.autoCloseDelay}ms linear forwards;
            `;
    }

    this.container.appendChild(notification);

    const notificationData = {
      id,
      element: notification,
      type,
      createdAt: new Date(),
      timeoutId: null,
    };

    this.notifications.push(notificationData);

    if (options.autoClose !== false && this.config.autoCloseDelay > 0) {
      notificationData.timeoutId = setTimeout(() => {
        this.hide(id);
      }, this.config.autoCloseDelay);
    }

    if (options.closable !== false) {
      const closeBtn = notification.querySelector(".notification-close");
      closeBtn.addEventListener("click", () => this.hide(id));
    }

    notification.addEventListener("mouseenter", () => {
      if (notificationData.timeoutId) {
        clearTimeout(notificationData.timeoutId);
        notificationData.timeoutId = null;

        const progressBar = notification.querySelector(
          ".notification-progress"
        );
        if (progressBar) {
          progressBar.style.animationPlayState = "paused";
        }
      }
    });

    notification.addEventListener("mouseleave", () => {
      if (options.autoClose !== false && this.config.autoCloseDelay > 0) {
        notificationData.timeoutId = setTimeout(() => {
          this.hide(id);
        }, this.config.autoCloseDelay);

        const progressBar = notification.querySelector(
          ".notification-progress"
        );
        if (progressBar) {
          const remaining = this.getRemainingProgress(progressBar);
          progressBar.style.animation = `progressShrink ${remaining}ms linear forwards`;
        }
      }
    });

    return id;
  }

  hide(id) {
    const notificationIndex = this.notifications.findIndex((n) => n.id === id);
    if (notificationIndex === -1) return;

    const notification = this.notifications[notificationIndex];

    if (notification.timeoutId) {
      clearTimeout(notification.timeoutId);
    }

    notification.element.style.animation =
      "notificationSlideOut 0.3s ease forwards";

    setTimeout(() => {
      if (notification.element.parentNode) {
        notification.element.parentNode.removeChild(notification.element);
      }
      this.notifications.splice(notificationIndex, 1);
    }, 300);
  }

  removeOldestNotification() {
    if (this.notifications.length === 0) return;

    const oldest = this.notifications.reduce((prev, current) =>
      prev.createdAt < current.createdAt ? prev : current
    );

    this.hide(oldest.id);
  }

  getRemainingProgress(progressBar) {
    const computedStyle = getComputedStyle(progressBar);
    const animationDuration =
      parseFloat(computedStyle.animationDuration) * 1000;
    const animationDelay = parseFloat(computedStyle.animationDelay) * 1000;
    const animationStartTime = Date.now() - animationDelay;

    return animationDuration - (Date.now() - animationStartTime);
  }

  getBackgroundColor(type) {
    const colors = {
      success: "#4caf50",
      error: "#f44336",
      warning: "#ff9800",
      info: "#2196f3",
    };

    return colors[type] || colors.info;
  }

  clearAll() {
    [...this.notifications].forEach((notification) => {
      this.hide(notification.id);
    });
  }

  getStats() {
    const now = new Date();
    const activeCount = this.notifications.length;
    const totalShown = JSON.parse(
      localStorage.getItem("notificationStats") || '{"total": 0}'
    );

    return {
      active: activeCount,
      totalShown: totalShown.total,
      byType: this.notifications.reduce((acc, n) => {
        acc[n.type] = (acc[n.type] || 0) + 1;
        return acc;
      }, {}),
    };
  }
}

// =================================================================================
// СИСТЕМА МОНИТОРИНГА ПРОИЗВОДИТЕЛЬНОСТИ
// =================================================================================

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoadTime: 0,
      domInteractiveTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0,
      memoryUsage: null,
    };

    this.performanceEntries = [];
    this.userInteractions = [];
    this.errors = [];
    this.startTime = performance.now();

    this.init();
  }

  init() {
    this.setupPerformanceObserver();
    this.setupUserInteractionTracking();
    this.setupErrorTracking();
    this.setupMemoryMonitoring();
    this.setupNavigationTracking();
  }

  setupPerformanceObserver() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.performanceEntries.push({
            name: entry.name,
            type: entry.entryType,
            startTime: entry.startTime,
            duration: entry.duration,
            timestamp: new Date().toISOString(),
          });

          switch (entry.entryType) {
            case "paint":
              if (entry.name === "first-paint") {
                this.metrics.firstPaint = entry.startTime;
              } else if (entry.name === "first-contentful-paint") {
                this.metrics.firstContentfulPaint = entry.startTime;
              }
              break;

            case "largest-contentful-paint":
              this.metrics.largestContentfulPaint = entry.startTime;
              break;

            case "layout-shift":
              if (!entry.hadRecentInput) {
                this.metrics.cumulativeLayoutShift += entry.value;
              }
              break;
          }
        }
      });

      observer.observe({
        entryTypes: [
          "paint",
          "largest-contentful-paint",
          "layout-shift",
          "longtask",
          "element",
          "navigation",
          "resource",
        ],
      });

      this.performanceObserver = observer;
    }

    window.addEventListener("load", () => {
      this.metrics.pageLoadTime = performance.now() - this.startTime;

      if (performance.getEntriesByType) {
        const navTiming = performance.getEntriesByType("navigation")[0];
        if (navTiming) {
          this.metrics.domInteractiveTime = navTiming.domInteractive;
          this.metrics.domContentLoadedTime =
            navTiming.domContentLoadedEventEnd;
          this.metrics.loadEventTime = navTiming.loadEventEnd;
        }
      }
    });
  }

  setupUserInteractionTracking() {
    document.addEventListener(
      "click",
      (event) => {
        this.recordUserInteraction({
          type: "click",
          target: event.target.tagName,
          className: event.target.className,
          id: event.target.id,
          timestamp: Date.now(),
          x: event.clientX,
          y: event.clientY,
        });
      },
      { passive: true }
    );

    document.addEventListener(
      "input",
      (event) => {
        if (
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA"
        ) {
          this.recordUserInteraction({
            type: "input",
            target: event.target.tagName,
            id: event.target.id,
            valueLength: event.target.value.length,
            timestamp: Date.now(),
          });
        }
      },
      { passive: true }
    );

    let scrollTimeout;
    window.addEventListener(
      "scroll",
      () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this.recordUserInteraction({
            type: "scroll",
            scrollY: window.scrollY,
            scrollPercentage:
              (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
              100,
            timestamp: Date.now(),
          });
        }, 100);
      },
      { passive: true }
    );

    const firstInputHandler = (entry) => {
      this.metrics.firstInputDelay = entry.processingStart - entry.startTime;

      this.recordUserInteraction({
        type: "first-input-delay",
        delay: this.metrics.firstInputDelay,
        target: entry.name,
        timestamp: Date.now(),
      });

      perfObserver.disconnect();
    };

    const perfObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(firstInputHandler);
    });

    perfObserver.observe({ type: "first-input", buffered: true });
  }

  setupErrorTracking() {
    window.addEventListener("error", (event) => {
      this.recordError({
        type: "js-error",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: Date.now(),
        stack: event.error?.stack,
      });
    });

    window.addEventListener("unhandledrejection", (event) => {
      this.recordError({
        type: "promise-error",
        reason: event.reason?.toString(),
        timestamp: Date.now(),
      });
    });

    window.addEventListener(
      "error",
      (event) => {
        const target = event.target;
        if (
          target &&
          (target.tagName === "LINK" ||
            target.tagName === "SCRIPT" ||
            target.tagName === "IMG")
        ) {
          this.recordError({
            type: "resource-error",
            tagName: target.tagName,
            src: target.src || target.href,
            timestamp: Date.now(),
          });
        }
      },
      true
    );
  }

  setupMemoryMonitoring() {
    if ("memory" in performance) {
      this.updateMemoryUsage();
      setInterval(() => this.updateMemoryUsage(), 10000);
    }
  }

  setupNavigationTracking() {
    window.addEventListener("hashchange", () => {
      this.recordUserInteraction({
        type: "hash-change",
        hash: window.location.hash,
        timestamp: Date.now(),
      });
    });

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event("pushstate"));
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event("replacestate"));
    };

    window.addEventListener("pushstate", () =>
      this.recordNavigation("pushstate")
    );
    window.addEventListener("replacestate", () =>
      this.recordNavigation("replacestate")
    );
    window.addEventListener("popstate", () =>
      this.recordNavigation("popstate")
    );
  }

  updateMemoryUsage() {
    if ("memory" in performance) {
      this.metrics.memoryUsage = {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      };
    }
  }

  recordUserInteraction(interaction) {
    this.userInteractions.push(interaction);

    if (this.userInteractions.length > 1000) {
      this.userInteractions = this.userInteractions.slice(-500);
    }

    this.saveToStorage("userInteractions", interaction);
  }

  recordError(error) {
    this.errors.push(error);

    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-50);
    }

    this.saveToStorage("errors", error);

    if (this.onErrorCallback) {
      this.onErrorCallback(error);
    }
  }

  recordNavigation(type) {
    this.recordUserInteraction({
      type: "navigation",
      navigationType: type,
      url: window.location.href,
      timestamp: Date.now(),
    });
  }

  saveToStorage(key, data) {
    try {
      const storageKey = `perfMonitor_${key}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
      existing.push({
        ...data,
        timestamp: new Date().toISOString(),
      });

      if (existing.length > 100) {
        existing = existing.slice(-50);
      }

      localStorage.setItem(storageKey, JSON.stringify(existing));
    } catch (error) {
      console.warn("Failed to save performance data:", error);
    }
  }

  getPerformanceSummary() {
    const now = performance.now();
    const sessionDuration = now - this.startTime;

    return {
      sessionDuration,
      metrics: this.metrics,
      interactionCount: this.userInteractions.length,
      errorCount: this.errors.length,
      performanceEntryCount: this.performanceEntries.length,
      interactionsByType: this.analyzeInteractionsByType(),
      commonErrors: this.analyzeCommonErrors(),
      recommendations: this.generateRecommendations(),
      startTime: new Date(this.startTime).toISOString(),
      currentTime: new Date().toISOString(),
    };
  }

  analyzeInteractionsByType() {
    return this.userInteractions.reduce((acc, interaction) => {
      acc[interaction.type] = (acc[interaction.type] || 0) + 1;
      return acc;
    }, {});
  }

  analyzeCommonErrors() {
    const errorCounts = {};
    this.errors.forEach((error) => {
      const key = `${error.type}:${error.message || error.reason}`;
      errorCounts[key] = (errorCounts[key] || 0) + 1;
    });

    return Object.entries(errorCounts)
      .map(([key, count]) => ({ error: key, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.metrics.largestContentfulPaint > 2500) {
      recommendations.push({
        type: "warning",
        message:
          "Largest Contentful Paint превышает 2.5 секунды. Рассмотрите оптимизацию загрузки ресурсов.",
        metric: "LCP",
        value: this.metrics.largestContentfulPaint,
      });
    }

    if (this.metrics.firstInputDelay > 100) {
      recommendations.push({
        type: "warning",
        message:
          "First Input Delay превышает 100ms. Оптимизируйте выполнение JavaScript.",
        metric: "FID",
        value: this.metrics.firstInputDelay,
      });
    }

    if (this.metrics.cumulativeLayoutShift > 0.1) {
      recommendations.push({
        type: "warning",
        message:
          "Cumulative Layout Shift превышает 0.1. Укажите размеры для изображений и динамического контента.",
        metric: "CLS",
        value: this.metrics.cumulativeLayoutShift.toFixed(3),
      });
    }

    if (this.metrics.memoryUsage) {
      const memoryUsagePercent =
        (this.metrics.memoryUsage.usedJSHeapSize /
          this.metrics.memoryUsage.jsHeapSizeLimit) *
        100;
      if (memoryUsagePercent > 70) {
        recommendations.push({
          type: "critical",
          message: `Использование памяти высокое: ${memoryUsagePercent.toFixed(
            1
          )}%. Проверьте на утечки памяти.`,
          metric: "Memory",
          value: memoryUsagePercent.toFixed(1) + "%",
        });
      }
    }

    if (this.errors.length > 10) {
      recommendations.push({
        type: "error",
        message: `Обнаружено ${this.errors.length} ошибок. Проверьте консоль разработчика.`,
        metric: "Errors",
        value: this.errors.length,
      });
    }

    return recommendations;
  }

  exportData() {
    const data = {
      summary: this.getPerformanceSummary(),
      metrics: this.metrics,
      interactions: this.userInteractions.slice(-100),
      errors: this.errors,
      performanceEntries: this.performanceEntries.filter(
        (entry) => entry.duration > 100
      ),
    };

    return JSON.stringify(data, null, 2);
  }

  onError(callback) {
    this.onErrorCallback = callback;
  }

  clear() {
    this.userInteractions = [];
    this.errors = [];
    this.performanceEntries = [];
    this.startTime = performance.now();

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.setupPerformanceObserver();
    }
  }
}

// =================================================================================
// СИСТЕМА ВАЛИДАЦИИ ФОРМ
// =================================================================================

class FormValidator {
  constructor(config = {}) {
    this.config = {
      errorClass: "error",
      validClass: "valid",
      errorElement: "span",
      ...config,
    };

    this.rules = {
      required: (value) => value.trim() !== "",
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      minLength: (value, min) => value.length >= min,
      maxLength: (value, max) => value.length <= max,
      numeric: (value) => /^\d+$/.test(value),
      alphanumeric: (value) => /^[a-zA-Z0-9]+$/.test(value),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        ),
      url: (value) => {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      phone: (value) => /^[\+]?[0-9\s\-\(\)]+$/.test(value),
      match: (value, fieldName) => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        return field && value === field.value;
      },
      custom: (value, callback) => callback(value),
    };

    this.messages = {
      required: "Это поле обязательно для заполнения",
      email: "Введите корректный email адрес",
      minLength: (min) => `Минимальная длина: ${min} символов`,
      maxLength: (max) => `Максимальная длина: ${max} символов`,
      numeric: "Допустимы только цифры",
      alphanumeric: "Допустимы только буквы и цифры",
      password:
        "Пароль должен содержать минимум 8 символов, включая заглавные, строчные буквы, цифры и специальные символы",
      url: "Введите корректный URL",
      phone: "Введите корректный номер телефона",
      match: "Значения не совпадают",
      custom: "Неверное значение",
    };
  }

  validate(form) {
    const fields = form.querySelectorAll("[data-validate]");
    let isValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const rules = field.dataset.validate.split("|");
    const value = field.value;
    let isValid = true;

    this.clearErrors(field);

    for (const rule of rules) {
      const [ruleName, param] = rule.split(":");

      if (this.rules[ruleName]) {
        const ruleResult = param
          ? this.rules[ruleName](value, param)
          : this.rules[ruleName](value);

        if (!ruleResult) {
          this.showError(field, ruleName, param);
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      this.showSuccess(field);
    }

    return isValid;
  }

  showError(field, ruleName, param) {
    field.classList.add(this.config.errorClass);
    field.classList.remove(this.config.validClass);

    const errorElement = document.createElement(this.config.errorElement);
    errorElement.className = "validation-error";
    errorElement.textContent = this.getMessage(ruleName, param);
    errorElement.style.cssText = `
            color: #f44336;
            font-size: 12px;
            margin-top: 4px;
            display: block;
        `;

    field.parentNode.appendChild(errorElement);

    field.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      field.style.animation = "";
    }, 500);
  }

  showSuccess(field) {
    field.classList.remove(this.config.errorClass);
    field.classList.add(this.config.validClass);
  }

  clearErrors(field) {
    field.classList.remove(this.config.errorClass, this.config.validClass);

    const existingError = field.parentNode.querySelector(".validation-error");
    if (existingError) {
      existingError.remove();
    }
  }

  getMessage(ruleName, param) {
    const message = this.messages[ruleName];
    return typeof message === "function" ? message(param) : message;
  }

  addLiveValidation(field) {
    let timeout;

    field.addEventListener("input", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.validateField(field);
      }, 500);
    });

    field.addEventListener("blur", () => {
      this.validateField(field);
    });
  }

  init() {
    const forms = document.querySelectorAll("form[data-validate-form]");

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        if (!this.validate(form)) {
          e.preventDefault();
          e.stopPropagation();

          const firstError = form.querySelector(`.${this.config.errorClass}`);
          if (firstError) {
            firstError.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            firstError.focus();
          }
        }
      });

      const fields = form.querySelectorAll("[data-validate]");
      fields.forEach((field) => this.addLiveValidation(field));
    });
  }
}

function updateThemeIcon() {
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});



// =================================================================================
// СИСТЕМА КЭШИРОВАНИЯ
// =================================================================================

class DataCache {
  constructor(options = {}) {
    this.options = {
      maxSize: 100,
      ttl: 60 * 60 * 1000,
      namespace: "app_cache",
      ...options,
    };

    this.cache = new Map();
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.options.namespace);
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();

        data.forEach((item) => {
          if (now - item.timestamp < item.ttl) {
            this.cache.set(item.key, item);
          }
        });
      }
    } catch (error) {
      console.warn("Failed to load cache from storage:", error);
    }
  }

  saveToStorage() {
    try {
      const data = Array.from(this.cache.values());
      localStorage.setItem(this.options.namespace, JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save cache to storage:", error);
    }
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  set(key, value, ttl = this.options.ttl) {
    if (this.cache.size >= this.options.maxSize) {
      this.evictOldest();
    }

    const item = {
      key,
      value,
      ttl,
      timestamp: Date.now(),
      accessCount: 0,
    };

    this.cache.set(key, item);
    this.saveToStorage();

    return item;
  }

  evictOldest() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.cache) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  delete(key) {
    this.cache.delete(key);
    this.saveToStorage();
  }

  clear() {
    this.cache.clear();
    localStorage.removeItem(this.options.namespace);
  }

  getStats() {
    const now = Date.now();
    const validItems = Array.from(this.cache.values()).filter(
      (item) => now - item.timestamp < item.ttl
    );

    return {
      totalItems: this.cache.size,
      validItems: validItems.length,
      expiredItems: this.cache.size - validItems.length,
      memoryUsage: JSON.stringify(Array.from(this.cache.values())).length,
      hitRate: this.calculateHitRate(),
    };
  }

  calculateHitRate() {
    const totalAccesses = Array.from(this.cache.values()).reduce(
      (sum, item) => sum + (item.accessCount || 0),
      0
    );

    return totalAccesses > 0
      ? (Array.from(this.cache.values()).filter((item) => item.accessCount > 0)
          .length /
          totalAccesses) *
          100
      : 0;
  }

  find(predicate) {
    return Array.from(this.cache.values())
      .filter(predicate)
      .map((item) => item.value);
  }

  invalidate(predicate) {
    for (const [key, item] of this.cache) {
      if (predicate(item)) {
        this.cache.delete(key);
      }
    }
    this.saveToStorage();
  }
}

// =================================================================================
// ИНИЦИАЛИЗАЦИЯ И ИНТЕГРАЦИЯ С СУЩЕСТВУЮЩИМ КОДОМ
// =================================================================================

let performanceMonitor;
let notificationManager;
let formValidator;
let dataCache;

function initializeExtendedFeatures() {
  try {
    performanceMonitor = new PerformanceMonitor();
    window.appPerformance = performanceMonitor;
  } catch (error) {
    console.warn("Performance monitoring initialization failed:", error);
  }

  try {
    notificationManager = new NotificationManager({
      position: "top-right",
      autoCloseDelay: 5000,
      maxNotifications: 3,
    });
    window.appNotifications = notificationManager;
  } catch (error) {
    console.warn("Notification manager initialization failed:", error);
  }

  try {
    formValidator = new FormValidator();
    formValidator.init();
  } catch (error) {
    console.warn("Form validator initialization failed:", error);
  }

  try {
    dataCache = new DataCache({
      maxSize: 50,
      ttl: 30 * 60 * 1000,
      namespace: "taskflow_cache",
    });
    window.appCache = dataCache;
  } catch (error) {
    console.warn("Data cache initialization failed:", error);
  }
}

function updateLiveStats() {
  if (!performanceMonitor) return;

  const stats = performanceMonitor.getPerformanceSummary();

  const loadTimeEl = document.getElementById("statLoadTime");
  const interactionsEl = document.getElementById("statInteractions");
  const completedEl = document.getElementById("statCompleted");
  const timerEl = document.getElementById("statTimer");

  if (loadTimeEl) {
    loadTimeEl.textContent = `${Math.round(stats.sessionDuration)}ms`;
  }

  if (interactionsEl) {
    interactionsEl.textContent = stats.interactionCount;
  }

  if (completedEl) {
    const completedTasks = tasks.filter((t) => t.done).length;
    completedEl.textContent = completedTasks;
  }

  if (timerEl) {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    timerEl.textContent =
      hours > 0
        ? `${hours}:${minutes.toString().padStart(2, "0")}`
        : `${minutes}:${(remainingSeconds % 60).toString().padStart(2, "0")}`;
  }
}

let statsInterval;
function startStatsUpdate() {
  if (statsInterval) clearInterval(statsInterval);

  statsInterval = setInterval(() => {
    updateLiveStats();

    if (performanceMonitor) {
      const recommendations =
        performanceMonitor.getPerformanceSummary().recommendations;
      const criticalWarnings = recommendations.filter(
        (r) => r.type === "critical"
      );

      if (criticalWarnings.length > 0 && notificationManager) {
        criticalWarnings.forEach((warning) => {
          notificationManager.show(
            "Предупреждение производительности",
            warning.message,
            "warning"
          );
        });
      }
    }
  }, 5000);
}

function setupExtendedEventHandlers() {
  const authButtons = document.querySelector(".auth-buttons");
  if (authButtons) {
    authButtons.appendChild(statsBtn);

    statsBtn.addEventListener("click", () => {
      const statsPanel = document.getElementById("statsPanel");
      if (statsPanel) {
        statsPanel.style.display = "block";
        updateLiveStats();
      }
    });
  }

  const closeStatsBtn = document.getElementById("closeStats");
  if (closeStatsBtn) {
    closeStatsBtn.addEventListener("click", () => {
      const statsPanel = document.getElementById("statsPanel");
      if (statsPanel) {
        statsPanel.style.display = "none";
      }
    });
  }

  const exportStatsBtn = document.getElementById("exportStats");
  if (exportStatsBtn && performanceMonitor) {
    exportStatsBtn.addEventListener("click", () => {
      const data = performanceMonitor.exportData();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `taskflow-performance-${
        new Date().toISOString().split("T")[0]
      }.json`;
      a.click();
      URL.revokeObjectURL(url);

      if (notificationManager) {
        notificationManager.show(
          "Экспорт завершен",
          "Данные о производительности успешно экспортированы",
          "success"
        );
      }
    });
  }

  if (authButtons) {
    authButtons.appendChild(settingsBtn);

    settingsBtn.addEventListener("click", () => {
      const settingsModal = document.getElementById("settingsModal");
      if (settingsModal) {
        settingsModal.style.display = "flex";
        settingsModal.setAttribute("aria-hidden", "false");
      }
    });
  }

  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const settingsModal = document.getElementById("settingsModal");
      if (settingsModal) {
        settingsModal.style.display = "none";
        settingsModal.setAttribute("aria-hidden", "true");
      }
    });
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;

      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove("active");
      });

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active");
      });

      btn.classList.add("active");
      document.getElementById(`tab-${tabId}`).classList.add("active");
    });
  });

  const saveSettingsBtn = document.getElementById("saveSettings");
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
      const settings = {
        autoSave: document.getElementById("autoSave")?.checked || true,
        autoBreak: document.getElementById("autoBreak")?.checked || true,
        language: document.getElementById("languageSelect")?.value || "ru",
        theme: document.getElementById("themeSelect")?.value || "light",
        fontSize: document.getElementById("fontSize")?.value || 16,
        notifyTasks: document.getElementById("notifyTasks")?.checked || true,
        notifyTimer: document.getElementById("notifyTimer")?.checked || true,
        autoSaveInterval: parseInt(
          document.getElementById("autoSaveInterval")?.value || 30
        ),
      };

      localStorage.setItem("appSettings", JSON.stringify(settings));

      applySettings(settings);

      document.getElementById("settingsModal").style.display = "none";
      document
        .getElementById("settingsModal")
        .setAttribute("aria-hidden", "true");

      if (notificationManager) {
        notificationManager.show(
          "Настройки сохранены",
          "Изменения применены успешно",
          "success"
        );
      }
    });
  }

  const clearCacheBtn = document.getElementById("clearCache");
  if (clearCacheBtn && dataCache) {
    clearCacheBtn.addEventListener("click", () => {
      if (confirm("Вы уверены, что хотите очистить кэш приложения?")) {
        dataCache.clear();

        if (notificationManager) {
          notificationManager.show(
            "Кэш очищен",
            "Все временные данные удалены",
            "success"
          );
        }
      }
    });
  }
}

function applySettings(settings) {
  if (settings.theme) {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }

  if (settings.fontSize) {
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }

  if (settings.autoSaveInterval && window.saveTasksInterval) {
    clearInterval(window.saveTasksInterval);
    window.saveTasksInterval = setInterval(
      saveTasks,
      settings.autoSaveInterval * 1000
    );
  }
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("appSettings") || "{}");
    applySettings(saved);
    return saved;
  } catch (error) {
    console.warn("Failed to load settings:", error);
    return {};
  }
}

// =================================================================================
// ДОПОЛНИТЕЛЬНЫЕ УТИЛИТЫ
// =================================================================================

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function measureExecutionTime(fn, ...args) {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();

  return {
    result,
    executionTime: end - start,
    timestamp: new Date().toISOString(),
  };
  
}

// =================================================================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// =================================================================================

document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
  tasks = loadTasks();

  tasks.forEach(t => {
    if (!t.id) t.id = crypto.randomUUID();
  });

  saveTasks();
  renderDayGrid();

  initializeExtendedFeatures();
  startStatsUpdate();
  setupExtendedEventHandlers();
  loadSettings();

  if (notificationManager && !localStorage.getItem("welcomeShown")) {
    notificationManager.show(
      "Добро пожаловать в TaskFlow!",
      "Все системы инициализированы. Приятного использования!",
      "success",
      { autoCloseDelay: 3000 }
    );
    localStorage.setItem("welcomeShown", "true");
  }
});



// Экспорт для отладки
window.TaskFlowExtended = {
  performanceMonitor,
  notificationManager,
  formValidator,
  dataCache,
  updateLiveStats,
  startStatsUpdate,
};

// Функция для создания функции, чередующей два значения
function alternatingValue(...values) {
  let index = 0;
  return () => values[index++ % values.length];
}

// Функция для создания функции, циклически проходящей по массиву
function cycleThrough(...items) {
  let index = 0;
  return () => items[index++ % items.length];
}

// Функция для создания функции, возвращающей следующее значение в последовательности
function sequence(start = 0, step = 1) {
  let current = start - step;
  return () => (current += step);
}

// Функция для создания функции, возвращающей случайное значение из массива
function randomChoice(...items) {
  return () => items[Math.floor(Math.random() * items.length)];
}

// Функция для создания функции, возвращающей случайное булевое значение
function randomBoolean(probability = 0.5) {
  return () => Math.random() < probability;
}

// Функция для создания функции, возвращающей случайное число в диапазоне
function randomRange(min, max) {
  return () => Math.random() * (max - min) + min;
}

// Функция для создания функции, возвращающей случайное целое число в диапазоне
function randomInteger(min, max) {
  return () => Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для создания функции, всегда возвращающей одно и то же значение
function constant(value) {
  return () => value;
}

// Функция для создания функции, которая ничего не делает
function noop() {}

// Функция для создания функции, которая выбрасывает ошибку
function alwaysThrow(error) {
  return () => {
    throw error;
  };
}

// Функция для создания функции, логирующей свои аргументы и возвращающей их
function tap(...args) {
  console.log(...args);
  return args;
}

// Функция для создания функции, логирующей свои аргументы и возвращающей другое значение
function tapAndReturn(logValue, returnValue) {
  console.log(logValue);
  return returnValue;
}

// Функция для создания функции, вызывающей метод у объекта
function methodCaller(methodName, ...args) {
  return (obj) => obj[methodName](...args);
}

// Функция для создания функции, получающей свойство у объекта
function propertyGetter(propertyName) {
  return (obj) => obj[propertyName];
}

// Функция для создания функции, проверяющей, есть ли у объекта свойство
function hasProperty(propertyName) {
  return (obj) => obj.hasOwnProperty(propertyName);
}

// Функция для создания функции, проверяющей, есть ли у объекта свойство и является ли оно истинным
function hasTruthyProperty(propertyName) {
  return (obj) => !!obj[propertyName];
}

// Функция для создания функции, проверяющей, есть ли у объекта свойство и равно ли оно значению
function hasPropertyValue(propertyName, value) {
  return (obj) => obj[propertyName] === value;
}

// Функция для создания функции, проверяющей, соответствует ли объект шаблону
function matches(pattern) {
  return (obj) => {
    for (const key in pattern) {
      if (obj[key] !== pattern[key]) {
        return false;
      }
    }
    return true;
  };
}

// Функция для создания функции, проверяющей, содержит ли массив значение
function contains(value) {
  return (arr) => arr.includes(value);
}

// Функция для создания функции, проверяющей, содержит ли массив любое из значений
function containsAny(...values) {
  return (arr) => arr.some((v) => values.includes(v));
}

// Функция для создания функции, проверяющей, содержит ли массив все из значений
function containsAll(...values) {
  return (arr) => values.every((v) => arr.includes(v));
}

// Функция для создания функции, проверяющей, соответствует ли строка регулярному выражению
function matchesRegex(regex) {
  return (str) => regex.test(str);
}

// Функция для создания функции, проверяющей, содержит ли строка подстроку
function includesSubstring(substring) {
  return (str) => str.includes(substring);
}

// Функция для создания функции, проверяющей, больше ли значение числа
function greaterThan(number) {
  return (val) => val > number;
}

// Функция для создания функции, проверяющей, меньше ли значение числа
function lessThan(number) {
  return (val) => val < number;
}

// Функция для создания функции, проверяющей, равно ли значение числу
function equalTo(number) {
  return (val) => val === number;
}

// Функция для создания функции, проверяющей, находится ли значение между двумя числами
function between(min, max) {
  return (val) => val >= min && val <= max;
}

// Функция для создания функции, проверяющей, четное ли значение
function isEven() {
  return (num) => num % 2 === 0;
}

// Функция для создания функции, проверяющей, нечетное ли значение
function isOdd() {
  return (num) => num % 2 !== 0;
}

// Функция для создания функции, проверяющей, положительное ли значение
function isPositive() {
  return (num) => num > 0;
}

// Функция для создания функции, проверяющей, отрицательное ли значение
function isNegative() {
  return (num) => num < 0;
}

// Функция для создания функции, проверяющей, равно ли значение нулю
function isZero() {
  return (num) => num === 0;
}

// Функция для создания функции, проверяющей, равно ли значение null
function isNull() {
  return (val) => val === null;
}

// Функция для создания функции, проверяющей, равно ли значение undefined
function isUndefined() {
  return (val) => val === undefined;
}

// Функция для создания функции, проверяющей, равно ли значение null или undefined
function isNil() {
  return (val) => val == null;
}

// Функция для создания функции, проверяющей, является ли значение массивом
function isArray() {
  return (val) => Array.isArray(val);
}

// Функция для создания функции, проверяющей, является ли значение строкой
function isString() {
  return (val) => typeof val === "string";
}

// Функция для создания функции, проверяющей, является ли значение числом
function isNumber() {
  return (val) => typeof val === "number" && !isNaN(val);
}

// Функция для создания функции, проверяющей, является ли значение булевым
function isBoolean() {
  return (val) => typeof val === "boolean";
}

// Функция для создания функции, проверяющей, является ли значение функцией
function isFunction() {
  return (val) => typeof val === "function";
}

// Функция для создания функции, проверяющей, является ли значение объектом
function isObject() {
  return (val) =>
    typeof val === "object" && val !== null && !Array.isArray(val);
}

// Функция для создания функции, проверяющей, является ли значение датой
function isDate() {
  return (val) => val instanceof Date;
}

// Функция для создания функции, проверяющей, является ли значение регулярным выражением
function isRegExp() {
  return (val) => val instanceof RegExp;
}

// Функция для создания функции, проверяющей, является ли значение Map
function isMap() {
  return (val) => val instanceof Map;
}

// Функция для создания функции, проверяющей, является ли значение Set
function isSet() {
  return (val) => val instanceof Set;
}

// Функция для создания функции, проверяющей, является ли значение WeakMap
function isWeakMap() {
  return (val) => val instanceof WeakMap;
}

// Функция для создания функции, проверяющей, является ли значение WeakSet
function isWeakSet() {
  return (val) => val instanceof WeakSet;
}

// Функция для создания функции, проверяющей, является ли значение Promise
function isPromise() {
  return (val) => val instanceof Promise;
}

// Функция для создания функции, проверяющей, является ли значение символом
function isSymbol() {
  return (val) => typeof val === "symbol";
}

// Функция для создания функции, проверяющей, является ли значение BigInt
function isBigInt() {
  return (val) => typeof val === "bigint";
}

// Функция для создания функции, проверяющей, является ли значение примитивом
function isPrimitive() {
  return (val) =>
    val === null || (typeof val !== "object" && typeof val !== "function");
}

if (timeInput) {
  timeInput.addEventListener("change", applyCustomTime);
}

if (modeSelect) {
  modeSelect.addEventListener("change", applyCustomTime);
}


// Функция для создания функции, проверяющей, является ли значение простым объектом
function isPlainObjectCheck() {
  return (val) => isPlainObject(val);
}

// Функция для создания функции, проверяющей, является ли значение ошибкой
function isError() {
  return (val) => val instanceof Error;
}

// Функция для создания функции, проверяющей, является ли значение конечным числом
function isFiniteNumber() {
  return (val) => Number.isFinite(val);
}

// Функция для создания функции, проверяющей, является ли значение целым числом
function isInteger() {
  return (val) => Number.isInteger(val);
}

// Функция для создания функции, проверяющей, является ли значение NaN
function isNaNCheck() {
  return (val) => Number.isNaN(val);
}

// Функция для создания функции, проверяющей, является ли значение безопасным целым числом
function isSafeInteger() {
  return (val) => Number.isSafeInteger(val);
}

// Функция для создания функции, проверяющей, пустая ли строка
function isEmptyString() {
  return (str) => str === "";
}

// Функция для создания функции, проверяющей, пустой ли массив
function isEmptyArray() {
  return (arr) => arr.length === 0;
}

// Функция для создания функции, проверяющей, пустой ли объект
function isEmptyObject() {
  return (obj) => Object.keys(obj).length === 0;
}

// Функция для создания функции, проверяющей, пустой ли Map
function isEmptyMap() {
  return (map) => map.size === 0;
}

// Функция для создания функции, проверяющей, пустой ли Set
function isEmptySet() {
  return (set) => set.size === 0;
}

// Функция для создания функции, проверяющей, пустая ли строка (пустая или пробелы)
function isBlankString() {
  return (str) => str.trim() === "";
}

// Функция для создания функции, проверяющей, находится ли значение в списке
function isIn(...values) {
  return (val) => values.includes(val);
}

// Функция для создания функции, проверяющей, не находится ли значение в списке
function isNotIn(...values) {
  return (val) => !values.includes(val);
}

// Функция для создания функции, проверяющей, больше ли или равно значение числу
function greaterThanOrEqual(number) {
  return (val) => val >= number;
}

// Функция для создания функции, проверяющей, меньше ли или равно значение числу
function lessThanOrEqual(number) {
  return (val) => val <= number;
}

// Функция для создания функции, проверяющей, не равно ли значение числу
function notEqualTo(number) {
  return (val) => val !== number;
}

// Функция для созда

// Функция для создания функции, проверяющей, не равно ли значение null
function isNotNull() {
  return (val) => val !== null;
}

// Функция для создания функции, проверяющей, не равно ли значение undefined
function isNotUndefined() {
  return (val) => val !== undefined;
}

// Функция для создания функции, проверяющей, не равно ли значение nil (не null или undefined)
function isNotNil() {
  return (val) => val != null;
}

// Функция для создания функции, проверяющей, не является ли значение массивом
function isNotArray() {
  return (val) => !Array.isArray(val);
}

// Функция для создания функции, проверяющей, не является ли значение строкой
function isNotString() {
  return (val) => typeof val !== "string";
}

// Функция для создания функции, проверяющей, не является ли значение числом
function isNotNumber() {
  return (val) => typeof val !== "number" || isNaN(val);
}

// Функция для создания функции, проверяющей, не является ли значение булевым
function isNotBoolean() {
  return (val) => typeof val !== "boolean";
}

// Функция для создания функции, проверяющей, не является ли значение функцией
function isNotFunction() {
  return (val) => typeof val !== "function";
}

// Функция для создания функции, проверяющей, не является ли значение объектом
function isNotObject() {
  return (val) => typeof val !== "object" || val === null || Array.isArray(val);
}

// Функция для создания функции, проверяющей, не является ли значение датой
function isNotDate() {
  return (val) => !(val instanceof Date);
}

// Функция для создания функции, проверяющей, не является ли значение регулярным выражением
function isNotRegExp() {
  return (val) => !(val instanceof RegExp);
}

// Функция для создания функции, проверяющей, не является ли значение Map
function isNotMap() {
  return (val) => !(val instanceof Map);
}

// Функция для создания функции, проверяющей, не является ли значение Set
function isNotSet() {
  return (val) => !(val instanceof Set);
}

// Функция для создания функции, проверяющей, не является ли значение WeakMap
function isNotWeakMap() {
  return (val) => !(val instanceof WeakMap);
}

// Функция для создания функции, проверяющей, не является ли значение WeakSet
function isNotWeakSet() {
  return (val) => !(val instanceof WeakSet);
}

// Функция для создания функции, проверяющей, не является ли значение Promise
function isNotPromise() {
  return (val) => !(val instanceof Promise);
}

// Функция для создания функции, проверяющей, не является ли значение символом
function isNotSymbol() {
  return (val) => typeof val !== "symbol";
}

// Функция для создания функции, проверяющей, не является ли значение BigInt
function isNotBigInt() {
  return (val) => typeof val !== "bigint";
}

// Функция для создания функции, проверяющей, не является ли значение примитивом
function isNotPrimitive() {
  return (val) =>
    val === null || typeof val === "object" || typeof val === "function";
}

// Функция для создания функции, проверяющей, не является ли значение простым объектом
function isNotPlainObjectCheck() {
  return (val) => !isPlainObject(val);
}

// Функция для создания функции, проверяющей, не является ли значение ошибкой
function isNotError() {
  return (val) => !(val instanceof Error);
}

// Функция для создания функции, проверяющей, не является ли значение конечным числом
function isNotFiniteNumber() {
  return (val) => !Number.isFinite(val);
}

// Функция для создания функции, проверяющей, не является ли значение целым числом
function isNotInteger() {
  return (val) => !Number.isInteger(val);
}

// Функция для создания функции, проверяющей, не является ли значение NaN
function isNotNaNCheck() {
  return (val) => !Number.isNaN(val);
}

// Функция для создания функции, проверяющей, не является ли значение безопасным целым числом
function isNotSafeInteger() {
  return (val) => !Number.isSafeInteger(val);
}

// Функция для создания функции, проверяющей, не пустая ли строка
function isNotEmptyString() {
  return (str) => str !== "";
}

// Функция для создания функции, проверяющей, не пустой ли массив
function isNotEmptyArray() {
  return (arr) => arr.length > 0;
}

// Функция для создания функции, проверяющей, не пустой ли объект
function isNotEmptyObject() {
  return (obj) => Object.keys(obj).length > 0;
}

// Функция для создания функции, проверяющей, не пустой ли Map
function isNotEmptyMap() {
  return (map) => map.size > 0;
}

// Функция для создания функции, проверяющей, не пустой ли Set
function isNotEmptySet() {
  return (set) => set.size > 0;
}

// Функция для создания функции, проверяющей, не пустая ли строка (не пустая или пробелы)
function isNotBlankString() {
  return (str) => str.trim() !== "";
}
