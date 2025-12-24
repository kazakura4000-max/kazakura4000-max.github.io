const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener("resize", resize);

const drops = Array.from({ length: 500 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    l: Math.random() * 20 + 10,
    s: Math.random() * 6 + 4
}));

function rain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(180,220,220,0.25)";
    ctx.lineWidth = 1;

    for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 2, d.y + d.l);
        ctx.stroke();

        d.y += d.s;
        if (d.y > window.innerHeight) {
            d.y = -20;
            d.x = Math.random() * window.innerWidth;
        }
    }

    requestAnimationFrame(rain);
}
rain();

/* link drops */
document.querySelectorAll(".links a").forEach(link => {
    link.addEventListener("mouseenter", () => {
        const drop = document.createElement("span");
        drop.className = "link-drop";
        link.appendChild(drop);
        setTimeout(() => drop.remove(), 600);
    });
});
