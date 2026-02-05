const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 250;
const MAX_DISTANCE = 120;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2.5 + 0.5
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // stars with glow
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(80, 227, 194, 0.6)';  // цвет свечения
        ctx.shadowBlur = 8;                         // сила свечения
        ctx.fill();
    });

    // reset shadow for lines
    ctx.shadowBlur = 0;

    // lines
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAX_DISTANCE) {
                ctx.strokeStyle = `rgba(80,227,194,${1 - dist / MAX_DISTANCE})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.stroke();
            }
        }
    }
}


function update() {
    stars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
    });
}

function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
}

createStars();
animate();
