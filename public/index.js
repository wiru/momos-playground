const socket = io(); 
let activePlayers = {};
let player = {};
let uniqueId = "";

// socket.on('message', message => {
// 	console.log(message)
// })
socket.on('id', id => {
	uniqueId = id;
})
socket.on('activePlayers', playerObjs => {
	activePlayers = playerObjs;
	player = playerObjs.uniqueId;
})

const canvas = document.getElementById('main-canvas'); // Reference the canvas element from HTML.  
const ctx = canvas.getContext('2d'); // Give access to built in canvas methods. 

canvas.width = 800; // No px required
canvas.height = 500;


const playerSprite = new Image(); // Create new instance of Image Object
playerSprite.src = "./images/hungary.png"; // Where to get the sprite sheet from. 

const background = new Image();
background.src = "./images/background.jpg";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) { // this takes 9 arguments. sX etc is sprite sheet cutout size. dX etc is where to draw on the canvas.
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function(e) { // Catch key input. e is event. This is NOT the DOWN key. It means when a button is pushed down. 
	keys[e.key] = true;
});
window.addEventListener("keyup", function(e) { // This removes pressed key from array when released by the user.  
	delete keys[e.key]
	player.moving = false;
});

function movePlayer() {
	if (keys.w && player.y > 0) { // If up key is in array && player within border, move player up by movement speed, using sprite from row 3. 
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

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) { 	// start animating based on the fps we pass in.
	fpsInterval = 1000/fps; 	// 1000 milliseconds is a second. 1000 miliseconds / fps. e.g. 1000/30 = 33
	then = Date.now(); // Gets a really long number of how many miliseconds since jan 1st.
	startTime = then; // save this number. 
	animate(); // run animate function. 
	console.log(Date.now())
}

function animate() {
	requestAnimationFrame(animate);
	now = Date.now();  
	elapsed = now - then; // gets the difference in ms between last time checked and now.
	if (elapsed > fpsInterval) { // if the elapsed time is greater than 
		then = now - (elapsed % fpsInterval); //		
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen after every frame??. *thoughts* isn't this weird? Does it redraw background every time??
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // canvas has 3 methods. this is one of them. We use 5 arg short version here. Here we draw our background from 0,0 to width and height. 
		drawPlayers(activePlayers)
		movePlayer();
		handlePlayerFrame();
		socket.emit('player', player)
	}
}
startAnimating(30);

function drawPlayers(players) {
	for (const player in players) {
		drawSprite(
		playerSprite, 			// This is the player Image Object. Contains src of sprite sheet.   
		player.width * player.frameX,  // Sprite height x multiplier. / TO CUT OUT FROM SPRITE SHEET. 	
		player.height * player.frameY,	// Sprite height y multiplier. / TO CUT OUT FROM SPRITE SHEET.
		player.width, 			// Sprite width. / TO CUT OUT FROM SPRITE SHEET.
		player.height, 			// Sprite height. / TO CUT OUT FROM SPRITE SHEET.
		player.x, 				// Player x position. / WHERE TO POSITION ON CANVAS.
		player.y, 				// Player y position. / WHERE TO POSITION ON CANVAS.
		player.width, 			// Sprite width. / WHERE TO POSITION ON CANVAS.
		player.height 			// Sprite height. / WHERE TO POSITION ON CANVAS.
		) // Takes sprite four corners from sprite sheet.
	}
}