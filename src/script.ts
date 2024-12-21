const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;

if (!canvas) throw new Error("Canvas not found.");

canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext("2d");

if (!context) throw new Error("Browser does not support <canvas> element.");

context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

context.fillStyle = "#0F0";
context.font = "24px monospace";
context.textAlign = "center";
context.fillText("Hello, World!", canvas.width / 2, canvas.height / 2);
