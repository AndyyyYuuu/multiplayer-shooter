
const io = require("socket.io")();
const { initGame, gameLoop } = require('./game');
const { FRAME_RATE } = require('./constants');
const { makeId } = require('./utils');

const state = {};
const clientRooms = {};


io.on("connection", client => {
	//client.emit("init", "Hello world!"); 

	client.on("keydown", handleKeydown);
	client.on("newGame", handleNewGame);
	client.on("joinGame", handleJoinGame);

	function handleJoinGame(gameCode){
		const room = io.sockets.adapter.rooms[gameCode];

		let allUsers;
		if (room){
			allUsers = room.sockets;
		}

		let numClients = 0;
		if (allUsers){
			numClients = Object.keys(allUsers).length;
		}

		if (numClients == 0){
			client.emit("unknownGame");
			return;
		} else if (numClients > 1){
			client.emit("tooManyPlayers");
			return;
		}

		clientRooms[client.id] = gameCode;

		client.join(gameCode);
		client.number = 2; 
		client.emit("init", 2);
		startGameTicks(gameCode);
	}

	function handleNewGame(){
		let roomName = makeId(5);
		clientRooms[client.id] = roomName;
		client.emit("gameCode", roomName);

		state[roomName] = initGame();

		client.join(roomName);
		client.number = 1;
		client.emit('init', 1);

	}

	function handleKeydown(key){
		const roomName = clientRooms[client.id];

		if (!roomName){
			return;
		}

		if (key == 65){
			state[roomName].players[client.number-1].vr = -Math.PI*0.1;
		} else if (key == 68){
			state[roomName].players[client.number-1].vr = Math.PI*0.1;
		}
	}

	//startGameTicks(client, state);
})
function startGameTicks(roomName){
	const intervalId = setInterval(() => {
		const winner = gameLoop(state[roomName]);
		if (!winner){
			emitGameState(roomName, state[roomName]);
		} else {
			emitGameOver(roomName, winner);
			state[roomName] = null;
			clearInterval(intervalId);
		}
	}, 1000 / FRAME_RATE)
}

function emitGameState(roomName, state){
	io.socket.in(roomName).emit("gameState", JSON.stringify(state));

}

function emitGameOver(roomName, winner){
	io.sockets.in(roomName).emit("gameOver", JSON.stringify({winner}));
}
io.listen(3000);