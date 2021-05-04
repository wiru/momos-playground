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
	socket.emit('id', id, console.log("NewID"));
	activePlayers[id] = {
	x: 50, // Horizontal position on x-axis
	y: 50	, // Vertical position on y-axis
	width: 32, // Our Sprite sheet width divided by 4 
	height: 48, // Our Sprite sheet height divided by 4
	frameX: 0, // A multiplier used later to find where to cut sprite from sprite sheet. 
	frameY: 0, // Same for y. 
	speed: 9, // How many pixels to move per frame.
	moving: false // To know if we are stationary or moving 
	};
	// console.log(activePlayers)
	// console.log(id);
	
	setInterval(function(){
		socket.emit('activePlayers', activePlayers, console.log("SEND")); 
	}, 1000);

	// socket.emit('activePlayers', activePlayers, console.log("SEND"));
	setInterval(function(){
		socket.on('player', data => {
			activePlayers[data.id] = data.data;
			// console.log("SERVER", activePlayers)
			// console.log(data.id)
			});
	}, 1000); 
});

const PORT = 4000 || process.env.PORT; 

server.listen(PORT, ()=> console.log(`Hot Server Action on ${PORT}!`));

