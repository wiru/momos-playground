const path = require('path');
const http = require('http'); // used by express under the hood. CreateServer we want directly though. 
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 4000; 
server.listen(PORT, ()=> console.log(`Hot Server Action on ${PORT}!`));

app.use(express.static(path.join(__dirname, '../public')));

const frameRate = 30;
let activePlayers = {}

io.on('connection', socket => {
	
	socket.on('reset', () => {
		activePlayers = {};
	}),
	
	socket.on('player', player => {
		activePlayers[player.id] = player
	})

});

startSendingPlayerStates()
function startSendingPlayerStates() {
	setInterval(() => {
		io.sockets.emit('update', activePlayers)
	}, 1000 / frameRate)	
}