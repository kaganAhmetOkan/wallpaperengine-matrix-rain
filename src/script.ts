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

// WALLPAPER ENGINE SETTINGS
let textColor = "0,255,0";
let fade = "0.1";
let backgroundColor = "0,0,0";
let backgroundRepaint = `0,0,0,${fade}`;
let speed = 30;

window.wallpaperPropertyListener = {
  applyUserProperties: (properties) => {
    if (properties.color) {
      const colors = properties.color.value.split(" ") as string[];
      const rgb = colors.map(c => Math.ceil(parseFloat(c) * 255)).join(",");
      textColor = `${rgb}`;
    }

    if (properties.background) {
      const colors = properties.background.value.split(" ") as string[];
      const rgb = colors.map(c => Math.ceil(parseFloat(c) * 255)).join(",");
      backgroundColor = `${rgb}`;
      backgroundRepaint = `${rgb},${fade}`;
    }

    if (properties.fade) {
      fade = properties.fade.value.toString();
      const colors = backgroundRepaint.split(",");
      colors[3] = fade;
      backgroundRepaint = colors.join(",");
    }

    if (properties.speed) {
      speed = properties.speed.value;
      startDrawing(speed);
    }
  }
}

// FPS CONTROLS
let interval: number;
let now: number;
let then: number;
let elapsed: number;

// PAINT CANVAS BLACK
context.fillStyle = `rgb(${backgroundColor})`;
context.fillRect(0, 0, canvas.width, canvas.height);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890=!?/<>()[]{}";
const fontSize = 16;

const columns = Math.floor(canvas.width / fontSize);
const positions = new Array(columns).fill(1);

let frameId: number | null = null;

function draw() {
  if (!context || !canvas) return;

  requestAnimationFrame(draw);

  now = Date.now();
  elapsed = now - then;

  if (elapsed < interval) return;

  then = now - (elapsed % interval);

  context.fillStyle = `rgba(${backgroundRepaint})`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = `rgb(${textColor})`;
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

function startDrawing(fps: number) {
  if (frameId !== null) {
    cancelAnimationFrame(frameId);
  }

  interval = 1000 / fps;
  then = Date.now();
  draw();
}

startDrawing(speed);
