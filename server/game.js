const { GAME_SIZE } = require('./constants')

module.exports = {
	initGame,
	gameLoop
}

function initGame(){
	const state = createGameState(); 
	return state;
}

function distance(x1, y1, x2, y2){
	return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}

function createGameState(){
	return {
	  players:[{
	    x: 256, 
	    y: 256, 
	    r: 0,
	    vr: 0, 
	    speed: 5
	  },
	  {
	    x: 256, 
	    y: 256, 
	    r: 0,
	    vr: 0, 
	    speed: 5
	  }], 

	  bullets:[], 
	  money:[
	  	{x: 128, y: 128}, 
	  	{x: 256, y: 128}
	  ]
	}
}

function gameLoop(state){
	if (!state){
		return
	}

	for (let i=0; i<state.players.length; i++){
		const player = state.players[i];
		player.r += player.vr;
		player.vr *= 0.8;

		player.x += Math.cos(player.r) * player.speed;
		player.y += Math.sin(player.r) * player.speed;

		player.x = Math.min(Math.max(player.x, 0), GAME_SIZE);
		player.y = Math.min(Math.max(player.y, 0), GAME_SIZE);

		//for (let i=0; i<bullets)

		for (let i=0; i<state.money.length; i++){
			if (distance(state.money[i].x, state.money[i].y, player.x, player.y) < 32){
				state.money[i] = {x: Math.random()*GAME_SIZE, y: Math.random()*GAME_SIZE};

			}
		}
	}
	

}