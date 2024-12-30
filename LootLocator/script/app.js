//? Инициализация карты
const map = L.map('map', {
    center: [0, 0], //? Установите начальные координаты
    zoom: 1.4, //? Уровень масштабирования
    minZoom: 1,
    maxZoom: 4,
});

//? Добавление изображения карты
const imageUrl = '../img/farm.webp'; //? Замените на путь к вашему изображению карты
const imageBounds = [[-100, -300], [100, 300]]; //? Установите границы изображения
L.imageOverlay(imageUrl, imageBounds).addTo(map);

//? Функция для создания инвертированной иконки
const createInvertedIcon = (iconUrl) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = iconUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            //? Инвертируем цвета
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];     //! Красный
                data[i + 1] = 255 - data[i + 1]; //* Зеленый
                data[i + 2] = 255 - data[i + 2]; //? Синий
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL()); //? Возвращаем инвертированное изображение
        };
    });
};

//? Добавление иконок (маркеров)
const zones = [
    { name: 'spawn', coords: [-44, -245], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [15, -180], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [25, -110], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [-58, -175], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [-63, -125], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [75, 9], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [10, 82], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [-5, 125], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [-5, 185], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [42, 195], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },
    { name: 'spawn', coords: [65, 173], iconUrl: '../img/spawn.png', marker: null, popupText: 'Спавн ЧВК' },

    { name: 'cloth', coords: [0, 0,], iconUrl: '../img/cloth.png', marker: null, popupText: 'Одежда'},

    { name: 'bag', coords: [10, 10,], iconUrl: '../img/bag.png', marker: null, popupText: 'Сумка'},

    { name: 'baggage', coords: [20, 20,], iconUrl: '../img/baggage.png', marker: null, popupText: 'Чемодан'},
];

//? Функция для добавления маркеров на карту
const addMarkers = async () => {
    for (const zone of zones) {
        const iconUrl = zone.name.startsWith('spawn') ? await createInvertedIcon(zone.iconUrl) : zone.iconUrl;
        zone.marker = L.marker(zone.coords, { icon: L.icon({ iconUrl, iconSize: [20, 20] }) }).addTo(map); //? Уменьшение размера иконок
        zone.marker.bindPopup(zone.popupText);
    }
};

//? Обработчики событий для чекбоксов
document.getElementById('spawnCheckbox').addEventListener('change', (event) => {
    zones.forEach(zone => {
        if (zone.name === 'spawn') {
            if (event.target.checked) {
                zone.marker.addTo(map);
            } else {
                map.removeLayer(zone.marker);
            }
        }
    });
});

document.getElementById('clothCheckbox').addEventListener('change', (event) => {
    zones.forEach(zone => {
        if (zone.name === 'cloth') {
            if (event.target.checked) {
                zone.marker.addTo(map);
            } else {
                map.removeLayer(zone.marker);
            }
        }
    });
});

document.getElementById('bagCheckbox').addEventListener('change', (event) => {
    zones.forEach(zone => {
        if (zone.name === 'bag') {
            if (event.target.checked) {
                zone.marker.addTo(map);
            } else {
                map.removeLayer(zone.marker);
            }
        }
    });
});

document.getElementById('baggageCheckbox').addEventListener('change', (event) => {
    zones.forEach(zone => {
        if (zone.name === 'baggage') {
            if (event.target.checked) {
                zone.marker.addTo(map);
            } else {
                map.removeLayer(zone.marker);
            }
        }
    });
});

//? Инициализация маркеров на карте
addMarkers();