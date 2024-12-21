const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

if (!canvas) throw new Error("Canvas not found.");

// RESIZE CANVAS TO FIT WINDOW
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const context = canvas.getContext("2d");

if (!context) throw new Error("Browser does not support <canvas> element.");

// PAINT CANVAS BLACK
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890=!?/<>()[]{}";
const fontSize = 16;

const columns = Math.floor(canvas.width / fontSize);
const positions = new Array(columns).fill(1);

function draw() {
  if (!context || !canvas) return;

  requestAnimationFrame(draw);

  context.fillStyle = "rgba(0,0,0,0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#0F0";
  context.font = `${fontSize}px monospace`;

  positions.forEach((position, index) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    context.fillText(char, index * fontSize, position * fontSize);

    if (position * fontSize > canvas.height && Math.random() > 0.975) {
      positions[index] = 0;
    }

    positions[index] += 1;
  });
}

draw();
