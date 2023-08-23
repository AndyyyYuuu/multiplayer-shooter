const BG_COLOR = "#051e1f";
const CHAR_COLOR = "#ebbe54";
const gameScreen = document.getElementById("game-screen");

const socket = io('http://localhost:3000');
socket.on('init', handleInit);

let canvas, ctx; 

const gameState = {
  player:{
    x: 512, 
    y: 512
  }
}

function init(){
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

function render(){
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const player = gameState.player;

  ctx.fillStyle = CHAR_COLOR;
  ctx.fillRect(256, 256);
}

function handleInit(msg){
  console.log(msg);
}