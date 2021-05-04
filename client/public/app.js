const express = require('express'); // server. Calling her to shortcut writing "const app = express()". oooooo cool. 
const app = express();
const http = require('http').Server(app); // needed for configuration of socket.io
// const io = require("socket.io")(http, {
// 	cors: {
// 	  origin: "https://localhost:8080",
// 	  methods: ["GET", "POST"]
// 	}
//   });
// const cors = require('cors')
// const position = {
// 	x: 200,
// 	y: 200
// };
// express.use(cors)
// io.on('connection', socket => { // when someone connects to a socket
// 	socket.emit('position', position); // socket does the following. Can put whatever we want here for action. Here socket emits position to user i think. 
// })

// Access-Control-Allow-Origin: *
app.listen(3000, () => { // Server listening on 3K.
	console.log("We have hot server action people..!")
})




// const canvas = document.getElementById('main-canvas'); // Reference the canvas element from HTML.  
// const ctx = canvas.getContext('2d'); // Give access to built in canvas methods. 

// canvas.width = 800; // No px required
// canvas.height = 500;

// const keys = []; // Keep track of pressed keys. *thougts* WIll need to create new ones for new users dynamically maybe??

// const player = { // player object.
// 	x: 384, // Horizontal position on x-axis
// 	y: 225	, // Vertical position on y-axis
// 	width: 32, // Our Sprite sheet width divided by 4 
// 	height: 48, // Our Sprite sheet height divided by 4
// 	frameX: 0, // A multiplier used later to find where to cut sprite from sprite sheet. 
// 	frameY: 0, // Same for y. 
// 	speed: 9, // How many pixels to move per frame.
// 	moving: false // To know if we are stationary or moving 
// }

// const playerSprite = new Image(); // Create new instance of Image Object
// playerSprite.src = "images/hungary.png"; // Where to get the sprite sheet from. 

// const background = new Image();
// background.src = "images/background.jpg";

// function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) { // this takes 9 arguments. sX etc is sprite sheet cutout size. dX etc is where to draw on the canvas.
// 	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
// }

// window.addEventListener("keydown", function(e) { // Catch key input. e is event. This is NOT the DOWN key. It means when a button is pushed down. 
// 	keys[e.key] = true;
// 	// console.log(keys)
// });
// window.addEventListener("keyup", function(e) { // This removes pressed key from array when released by the user.  
// 	delete keys[e.key]
// 	// console.log(keys)
// 	player.moving = false;
// });

// function movePlayer() {
// 	if (keys.w && player.y > 0) { // If up key is in array && player within border, move player up by movement speed, using sprite from row 3. 
// 		player.y -= player.speed;
// 		player.frameY = 3;
// 		player.moving = true;
// 	}
// 	if (keys.a && player.x > 0) {
// 		player.x -= player.speed;
// 		player.frameY = 1;
// 		player.moving = true;
// 	}
// 	if (keys.s && player.y < 450) { //
// 		player.y += player.speed;
// 		player.frameY = 0;
// 		player.moving = true;
// 	}
// 	if (keys.d && player.x < 765) {
// 		player.x += player.speed;
// 		player.frameY = 2;
// 		player.moving = true;
// 	}
// };

// function handlePlayerFrame() {
// 	if (player.frameX < 3 && player.moving) player.frameX++
// 	else player.frameX = 0
// }

// let fps, fpsInterval, startTime, now, then, elapsed;

// function startAnimating(fps) { 	// start animating based on the fps we pass in.
// 	fpsInterval = 1000/fps; 	// 1000 milliseconds is a second. 1000 miliseconds / fps. e.g. 1000/30 = 33
// 	then = Date.now(); // Gets a really long number of how many miliseconds since jan 1st.
// 	startTime = then; // save this number. 
// 	animate(); // run animate function. 
// 	console.log(Date.now())
// }

// function animate() {
// 	requestAnimationFrame(animate);
// 	now = Date.now();  
// 	elapsed = now - then; // gets the difference in ms between last time checked and now.
// 	if (elapsed > fpsInterval) { // if the elapsed time is greater than 
// 		then = now - (elapsed % fpsInterval); //		
// 		ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen after every frame??. *thoughts* isn't this weird? Does it redraw background every time??
// 		ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // canvas has 3 methods. this is one of them. We use 5 arg short version here. Here we draw our background from 0,0 to width and height. 
// 		drawSprite(
// 		playerSprite, 			// This is the player Image Object. Contains src of sprite sheet.   
// 		player.width * player.frameX,  // Sprite height x multiplier. / TO CUT OUT FROM SPRITE SHEET. 	
// 		player.height * player.frameY,	// Sprite height y multiplier. / TO CUT OUT FROM SPRITE SHEET.
// 		player.width, 			// Sprite width. / TO CUT OUT FROM SPRITE SHEET.
// 		player.height, 			// Sprite height. / TO CUT OUT FROM SPRITE SHEET.
// 		player.x, 				// Player x position. / WHERE TO POSITION ON CANVAS.
// 		player.y, 				// Player y position. / WHERE TO POSITION ON CANVAS.
// 		player.width, 			// Sprite width. / WHERE TO POSITION ON CANVAS.
// 		player.height 			// Sprite height. / WHERE TO POSITION ON CANVAS.
// 		) // Takes sprite four corners from sprite sheet.
// 		movePlayer();
// 		handlePlayerFrame();
// 	}
// }
// startAnimating(30);
