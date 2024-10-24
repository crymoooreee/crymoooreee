const theme = document.querySelector(".circle_button");
const dot = document.querySelector(".dot");
const body = document.querySelector("body");
const wrappers = document.querySelectorAll(".wrapper");
const works = document.querySelectorAll(".work");
const workscont = document.querySelector(".works_container");
const wrapperabout = document.querySelector(".wrapper_about");
const nav = document.querySelector(".nav");
const navBtns = document.querySelectorAll(".nav_btn");
const textc = document.querySelector(".text");
const logo = document.querySelector(".logo");
const btnclose = document.querySelector(".btn-close");
const slider = document.querySelector(".sim-slider");
const footer = document.getElementById("footer_btns");
const footertext = document.getElementById("footer_text");
const modalcont = document.getElementById("modal_content");

// Проверяем сохраненную тему в localStorage
let btn = localStorage.getItem('theme') === 'dark'; // true, если сохранена темная тема

// Функция для применения темы
function applyTheme() {
  if (btn) {
    if (dot) {
      dot.style.left = "10px";
      dot.style.transition = ".5s ease";
      dot.style.backgroundColor = "#2b2b2b";
      theme.style.backgroundColor = "#00000020";
    }

    body.style.setProperty("background-color", "#ffffff", "important");
    body.style.setProperty("color", "#1d1d1d", "important");
    body.style.transition = ".5s ease";
    
    if(slider){
        slider.style.setProperty("background-color", "#ffffff", "important");
    }

    works.forEach(work => {
      work.style.setProperty("background-color", "#ffffff", "important");
      work.style.setProperty("color", "#1d1d1d", "important");
    });

    wrappers.forEach(wrapper => {
      wrapper.style.setProperty("background-color", "#ffffff", "important");
      wrapper.style.setProperty("color", "#1d1d1d", "important");
    });

    if (nav) {
      nav.style.setProperty("background-color", "#ffffff", "important");
      nav.style.setProperty("color", "#1d1d1d", "important");
    }

    if (wrapperabout) {
      wrapperabout.style.setProperty("background-color", "#ffffff", "important");
      wrapperabout.style.setProperty("color", "#1d1d1d", "important");
    }

    if (workscont) {
      workscont.style.setProperty("background-color", "#ffffff", "important");
      workscont.style.setProperty("color", "#1d1d1d", "important");
    }

    if (modalcont) {
      modalcont.style.setProperty("background-color", "#ffffff", "important");
    }

    if (footertext) {
      footertext.style.setProperty("color", "#1d1d1d", "important");
    }

    if (footer) {
      footer.style.setProperty("background-color", "#ffffff", "important");
    }

    navBtns.forEach(btn => {
      btn.style.setProperty("color", "#1d1d1d", "important");
      btn.style.transition = ".5s ease";
    });

    if (textc) {
      textc.style.setProperty("color", "#1d1d1d", "important");
    }

    if (logo) {
      logo.style.filter = "none";
    }

    if (btnclose) {
      btnclose.style.filter = "none";
    }
  } else {
    if (dot) {
      dot.style.left = "-10px";
      dot.style.transition = ".5s ease";
      dot.style.backgroundColor = "#ffffff";
      theme.style.backgroundColor = "#2b2b2b";
    }

    body.style.setProperty("background-color", "#1d1d1d", "important");
    body.style.setProperty("color", "#ffffff", "important");
    body.style.transition = ".5s ease";
    
    if(slider){
        slider.style.setProperty("background-color", "#1d1d1d", "important");
    }

    works.forEach(work => {
      work.style.setProperty("background-color", "#1d1d1d", "important");
      work.style.setProperty("color", "#ffffff", "important");
    });

    wrappers.forEach(wrapper => {
      wrapper.style.setProperty("background-color", "#1d1d1d", "important");
      wrapper.style.setProperty("color", "#ffffff", "important");
    });

    if (nav) {
      nav.style.setProperty("background-color", "#1d1d1d", "important");
      nav.style.setProperty("color", "#ffffff", "important");
    }

    if ( wrapperabout) {
      wrapperabout.style.setProperty("background-color", "#1d1d1d", "important");
      wrapperabout.style.setProperty("color", "#ffffff", "important");
    }

    if (workscont) {
      workscont.style.setProperty("background-color", "#1d1d1d", "important");
      workscont.style .setProperty("color", "#ffffff", "important");
    }

    if (modalcont) {
      modalcont.style.setProperty("background-color", "#1d1d1d", "important");
    }

    if (footertext) {
      footertext.style.setProperty("color", "#ffffff", "important");
    }

    if (footer) {
      footer.style.setProperty("background-color", "#1d1d1d", "important");
    }

    navBtns.forEach(btn => {
      btn.style.setProperty("color", "#ffffff", "important");
      btn.style.transition = ".5s ease";
    });

    if (textc) {
      textc.style.setProperty("color", "#ffffff", "important");
    }

    if (logo) {
      logo.style.filter = "invert()";
    }

    if (btnclose) {
      btnclose.style.filter = "invert()";
    }
  }
}

// Применяем тему при загрузке страницы
applyTheme();

// Обработчик события для переключения темы
theme.addEventListener("click", () => {
  btn = !btn;
  localStorage.setItem('theme', btn ? 'dark' : 'light'); // Сохраняем выбранную тему
  applyTheme(); // Применяем выбранную тему
});