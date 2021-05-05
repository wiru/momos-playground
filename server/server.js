const path = require('path');
const http = require('http'); // used by express under the hood. CreateServer we want directly though. 
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder 
app.use(express.static(path.join(__dirname, '../public')));

// Player objects array
let activePlayers = {}

// Run when client connects
io.on('connection', socket => {
	socket.on('player', player => {
		activePlayers[player.id] = player
		socket.emit('activePlayers', activePlayers); 
	});
});

const PORT = process.env.PORT || 4000; 

server.listen(PORT, ()=> console.log(`Hot Server Action on ${PORT}!`));

