const BG_COLOR = "#051e1f";
const CHAR_COLOR = "#ebbe54";
const gameScreen = document.getElementById("game-screen");
const initialScreen = document.getElementById("initialScreen");
const newGameBtn = document.getElementById("newGameButton");
const joinGameBtn = document.getElementById("joinGameButton");
const gameCodeInput = document.getElementById("gameCodeInput");
const gameCodeDisplay = document.getElementById("gameCodeDisplay");


newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);

function newGame(){
  socket.emit("newGame");
  init();
}

function joinGame(){
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  init();
}

const socket = io('http://localhost:3000');
socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameCode', handleGameCode);
socket.on('unknownGame', handleUnknownGame);
socket.on('tooManyPlayers', handleTooManyPlayers);

let canvas, ctx; 
let playerNumber;

const gameState = {
  player:{
    x: 256, 
    y: 256, 
    r: 0, 
    vr: 0, 
    speed: 5
  }, 
  bullets:[],
  money:[
    {x: 128, y: 128}, 
    {x: 256, y: 128}
  ]
}

function init(){
  gameScreen.style.display = "block";
  initialScreen.style.display = "none";
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = canvas.height = 512;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.addEventListener("keydown", keydown);

}

function keydown(e){
  socket.emit("keydown", e.keyCode);
}

function render(gameState){
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const player = gameState.player;

  drawPlayer(state.players[0], "red");
  drawPlayer(state.players[1], "blue");

  for (let i=0; i<gameState.money.length; i++){
    ctx.beginPath();
    ctx.arc(player.x, player.y, 16, 0, 2*Math.PI);
    ctx.fill();
  }
}

function drawPlayer(player, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, 16, 0, 2*Math.PI);
  ctx.fill();
}

function handleInit(number){
  playerNumber = number;

}

function handleGameState(state){
  state = JSON.parse(state);
  requestAnimationFrame(() => render(state));
}

function handleGameCode(gameCode){
  gameCodeDisplay.innerText = gameCode;
}

function handleUnknownGame(){
  reset();
  alert("Unknown game code!");
}

function handleTooManyPlayers(){
  reset();
  alert("This game is already in progress!");
}

function reset(){
  playerNumber = null;
  gameCodeInput.value = "";
  gameCodeDisplay.innerText = "";
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}