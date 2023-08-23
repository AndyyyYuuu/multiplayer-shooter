const BG_COLOR = "#051e1f";
const CHAR_COLOR = "#ebbe54";
const gameScreen = document.getElementById("game-screen");

let canvas, ctx; 

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = canvas.height = 512;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.addEventListener("keydown", keydown);
}

function keydown(e){
  console.log(e.key);
}

init();
