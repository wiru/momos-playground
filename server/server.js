const path = require('path');
const http = require('http'); // used by express under the hood. CreateServer we want directly though. 
const express = require('express');
const socketio = require('socket.io');
const uuid = require('uuid').v4;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder 
app.use(express.static(path.join(__dirname, '../public')));

// Player objects array
let activePlayers = {}

// Run when client connects
io.on('connection', socket => {
	const id = uuid();
	const player = {};
	player.x = 50, // Horizontal position on x-axis
	player.y = 50	, // Vertical position on y-axis
	player.width = 32, // Our Sprite sheet width divided by 4 
	player.height = 48, // Our Sprite sheet height divided by 4
	player.frameX = 0, // A multiplier used later to find where to cut sprite from sprite sheet. 
	player.frameY = 0, // Same for y. 
	player.speed = 9, // How many pixels to move per frame.
	player.moving = false // To know if we are stationary or moving 
	console.log(player);
	activePlayers[id] = player;

	console.log(activePlayers);
	socket.emit('id', id);
	// socket.emit('message', 'Dis messig from saabaa!')
	socket.on('player', playerObj => {
		activePlayers.id = playerObj;
		socket.emit('activePlayers', activePlayers);
	});
});


const PORT = 4000 || process.env.PORT; 

server.listen(PORT, ()=> console.log(`Hot Server Action on ${PORT}!`));




// THE GAME //