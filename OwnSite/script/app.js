const text = document.querySelector(".text p");
        text.innerHTML = text.innerText.split("").map((letter, i) =>
        `<span style="transform:rotate(${i * 8.2}deg")>${letter}</span>`
        )
        .join("");