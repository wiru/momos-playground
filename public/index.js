const canvas = document.getElementById('main-canvas'); // Reference the canvas element from HTML.  
const ctx = canvas.getContext('2d'); // Give access to built in canvas methods. 
canvas.width = 800; // No "px" required
canvas.height = 500;

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
}

///////////////////////////////////////////////////////////////////////////////////////

const socket = io(); 
let activePlayers = {};
let id = uuidv4();
let player = {
	id: id, 
	x: 49,
	y: 49,
	width: 32,
	height: 48,
	frameX: 0,
	frameY: 0,
	speed: 9,
	moving: false,
	src: ""
};
///////////////////////////////////////////////////////////////////////////////////////

document.getElementById("reset").onclick = function() {
	socket.emit("reset")
}

window.addEventListener("keydown", function(e) { // Catch key input. e is event. This is NOT the DOWN key. It means when a button is pushed down. 
	keys[e.key] = true;
	player.moving = true;	
});

window.addEventListener("keyup", function(e) { // This removes pressed key from array when released by the user.  
	delete keys[e.key]
	player.moving = false;
})

///////////////////////////////////////////////////////////////////////////////////////

const sprites = [
	"./images/1.png",
	"./images/2.png",
	"./images/3.png",
	"./images/4.png",
	"./images/5.png",
	"./images/6.png",
	"./images/7.png",
	"./images/8.png",
	"./images/9.png",
	"./images/10.png",
	"./images/11.png",
	"./images/12.png"
	];

const playerSprite = new Image(); // Create new instance of Image Object
playerSprite.src = "./images/1.png"; // Where to get the sprite sheet from. 
player.src = getRandomSprite();

const background = new Image();
background.src = "./images/background.jpg";

let keys = [];

let fps, fpsInterval, startTime, now, then, elapsed;

///////////////////////////////////////////////////////////////////////////

function getRandomSprite() {
     let randomNum = Math.floor(Math.random() * sprites.length);
     return sprites[randomNum];
}

//////////////////////////////////////////////////////////////

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) { // this takes 9 arguments. sX etc is sprite sheet cutout size. dX etc is where to draw on the canvas.
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

///////////////////////////////////////////////////////////////////////////

socket.on('update', playerObjs => {
	activePlayers = playerObjs;
});

///////////////////////////////////////////////////////////////////////////////////////

function movePlayer() {
	if (keys.w && player.y > 0) { 
		player.y -= player.speed;
		player.frameY = 3;
		player.moving = true;
	}
	if (keys.a && player.x > 0) {
		player.x -= player.speed;
		player.frameY = 1;
		player.moving = true;
	}
	if (keys.s && player.y < 450) { //
		player.y += player.speed;
		player.frameY = 0;
		player.moving = true;
	}
	if (keys.d && player.x < 765) {
		player.x += player.speed;
		player.frameY = 2;
		player.moving = true;
	}
};

function handlePlayerFrame() {
	if (player.frameX < 3 && player.moving) player.frameX++
	else player.frameX = 0
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen after every frame??. *thoughts* isn't this weird? Does it redraw background every time??
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // canvas has 3 methods. this is one of them. We use 5 arg short version here. Here we draw our background from 0,0 to width and height. 
	for (const player in activePlayers) {
		// console.l	og(activePlayers[player])
		let img = new Image()
		img.src = activePlayers[player].src
		drawSprite(img, 			// This is the player Image Object. Contains src of sprite sheet.   
			activePlayers[player].width * activePlayers[player].frameX,  // Sprite height x multiplier. / TO CUT OUT FROM SPRITE SHEET. 	
			activePlayers[player].height * activePlayers[player].frameY,	// Sprite height y multiplier. / TO CUT OUT FROM SPRITE SHEET.
			activePlayers[player].width, 			// Sprite width. / TO CUT OUT FROM SPRITE SHEET.
			activePlayers[player].height, 		// Sprite height. / TO CUT OUT FROM SPRITE SHEET.
			activePlayers[player].x, 				// Player x position. / WHERE TO POSITION ON CANVAS.
			activePlayers[player].y, 				// Player y position. / WHERE TO POSITION ON CANVAS.
			activePlayers[player].width, 			// Sprite width. / WHERE TO POSITION ON CANVAS.
			activePlayers[player].height 			// Sprite height. / WHERE TO POSITION ON CANVAS.
			); // Takes sprite four corners from sprite sheet.
		}
		socket.emit("player", player)
		requestAnimationFrame(animate)
}

function moveTracker() {
	setInterval(()=> {
		movePlayer(),
		handlePlayerFrame()
	}, 30)
}

moveTracker()
animate()
		