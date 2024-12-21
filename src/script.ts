const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

if (!canvas) throw new Error("Canvas was not found.");

const context = canvas.getContext("2d");

if (!context) throw new Error("Canvas is not supported.");

// INITIALIZE CANVAS
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  main();
});

// WALLPAPER ENGINE SETTINGS
let textColor = "0,255,0";
let backgroundColor = "0,0,0";
let fade = 0.1;
let speed = 30;
let font = "monospace";
let fontSize = 16;

let backgroundRepaint = `${backgroundColor},${fade}`;

let timeout: number | null = null;
let initialTimeout = false;

window.wallpaperPropertyListener = {
  applyUserProperties: (properties) => {
    if (properties.color) {
      textColor = properties.color.value
        .split(" ")
        .map((c) => Math.ceil(parseFloat(c) * 255))
        .join(",");
    }

    if (properties.background) {
      backgroundColor = properties.background.value
        .split(" ")
        .map((c) => Math.ceil(parseFloat(c) * 255))
        .join(",");
      backgroundRepaint = `${backgroundColor},${fade}`;
    }

    if (properties.fade) {
      fade = properties.fade.value;
      backgroundRepaint = `${backgroundColor},${fade}`;
    }

    if (properties.speed) {
      speed = properties.speed.value;
      main();
    }

    if (properties.font) {
      font = properties.font.value;
    }

    if (properties.size) {
      fontSize = properties.size.value;
      main();
    }
  },
};

let frameId: number | null = null;

function main() {
  if (!canvas || !context) return;

  if (frameId !== null) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }

  // FPS CONTROLS
  let interval: number;
  let now: number;
  let then: number;
  let elapsed: number;

  // PAINT CANVAS
  context.fillStyle = `rgb(${backgroundColor})`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // INITIALIZE ANIMATION
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890=!?/<>()[]{}";
  const columns = Math.floor(canvas.width / fontSize);
  const positions = new Array(columns).fill(1);

  function draw() {
    if (!context || !canvas) return;

    frameId = requestAnimationFrame(draw);

    // CALCULATE FPS
    now = Date.now();
    elapsed = now - then;
    if (elapsed < interval) return;

    then = now - (elapsed % interval);

    context.fillStyle = `rgba(${backgroundRepaint})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = `rgb(${textColor})`;
    context.font = `${fontSize}px ${font}, monospace`;

    positions.forEach((position, index) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      context.fillText(char, index * fontSize, position * fontSize);

      if (position * fontSize > canvas.height && Math.random() > 0.975) {
        positions[index] = 0;
      }

      positions[index] += 1;
    });
  }

  function start() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId === null;
    }

    interval = 1000 / speed;
    then = Date.now();
    draw();
  }

  start();
}

main();
