const canvas = document.getElementById('main-canvas'); // Reference the canvas element from HTML.  
const ctx = canvas.getContext('2d'); // Give access to built in canvas methods. 

const socket = io(); 
let activePlayers = {};
let player = {};
let uniqueId = "";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) { // this takes 9 arguments. sX etc is sprite sheet cutout size. dX etc is where to draw on the canvas.
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

///////////////////////////////////////////////////////////////////////////
socket.on('id', id => {
	uniqueId = id
});

setInterval(function(){
socket.on('activePlayers', playerObjs => {
	activePlayers = playerObjs;
	console.log("CLIENT", activePlayers)
}, 1000); 
	startAnimating(30);
////////////////////////////////////////////////////////////////////////////
})
function startAnimating(fps) { 	// start animating based on the fps we pass in.
	fpsInterval = 1000/fps; 	// 1000 milliseconds is a second. 1000 miliseconds / fps. e.g. 1000/30 = 33
	then = Date.now(); // Gets a really long number of how many miliseconds since jan 1st.
	startTime = then; // save this number. 
	animate(); // run animate function. 
	console.log(Date.now())
}

/////////////////////////////////////////////////////////////////////////////////////
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen after every frame??. *thoughts* isn't this weird? Does it redraw background every time??
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // canvas has 3 methods. this is one of them. We use 5 arg short version here. Here we draw our background from 0,0 to width and height. 
	for (const player in activePlayers) {
		console.log(activePlayers)
		drawSprite(playerSprite, 			// This is the player Image Object. Contains src of sprite sheet.   
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
		// drawPlayers(activePlayers)
		requestAnimationFrame(animate);
		now = Date.now();
		// console.log("CHECK2")
		elapsed = now - then; // gets the difference in ms between last time checked and now.
		if (elapsed > fpsInterval) { // if the elapsed time is greater than 
			then = now - (elapsed % fpsInterval); //		
			// console.log("CHECK")
			movePlayer();
			// console.log(player[uniqueId])
			handlePlayerFrame();
			setInterval(function(){
				socket.emit('player', { data:activePlayers[uniqueId], id:uniqueId }, console.log("REPLY"))
			}, 1000);
			// console.log( uniqueId, player)
		}
	}
	
	
	canvas.width = 800; // No px required
	canvas.height = 500;
	
	const playerSprite = new Image(); // Create new instance of Image Object
	playerSprite.src = "./images/hungary.png"; // Where to get the sprite sheet from. 
	
	const background = new Image();
	background.src = "./images/background.jpg";
	
	
	let keys = [];
	
	function movePlayer() {
		// console.log(activePlayers);
		// console.log(uniqueId)
		if (keys.w && activePlayers[uniqueId].y > 0) { 
			console.log("NORTH!")
			console.log("BEFORE", activePlayers[uniqueId].y)
			activePlayers[uniqueId].y -= activePlayers[uniqueId].speed;
			console.log("AFTER", activePlayers[uniqueId].y)
			activePlayers[uniqueId].frameY = 3;
			activePlayers[uniqueId].moving = true;
		}
		if (keys.a && activePlayers[uniqueId].x > 0) {
			activePlayers[uniqueId].x -= activePlayers[uniqueId].speed;
			activePlayers[uniqueId].frameY = 1;
			activePlayers[uniqueId].moving = true;
		}
		if (keys.s && activePlayers[uniqueId].y < 450) { //
			activePlayers[uniqueId].y += activePlayers[uniqueId].speed;
			activePlayers[uniqueId].frameY = 0;
			activePlayers[uniqueId].moving = true;
		}
		if (keys.d && activePlayers[uniqueId].x < 765) {
			activePlayers[uniqueId].x += activePlayers[uniqueId].speed;
			activePlayers[uniqueId].frameY = 2;
			activePlayers[uniqueId].moving = true;
		}
	};
	
	function handlePlayerFrame() {
		// console.log(player[uniqueId].frameX)
		if (activePlayers[uniqueId].frameX < 3 && activePlayers[uniqueId].moving) activePlayers[uniqueId].frameX++
		else activePlayers[uniqueId].frameX = 0
	}
	
	let fps, fpsInterval, startTime, now, then, elapsed;
	
	
	// function drawPlayers(players) {
		// 	// console.log(players)
		// 	for (const player in players) {
			// 		key = Object.keys(players[player]);
			// 		// let p = players[player][key[0]];
			// 		ctx.drawSprite(
				// 			playerSprite, 			// This is the player Image Object. Contains src of sprite sheet.   
				// 			players[player][key[0]].width * players[player][key[0]].frameX,  // Sprite height x multiplier. / TO CUT OUT FROM SPRITE SHEET. 	
				// 			players[player][key[0]].height * players[player][key[0]].frameY,	// Sprite height y multiplier. / TO CUT OUT FROM SPRITE SHEET.
				// 			players[player][key[0]].width, 			// Sprite width. / TO CUT OUT FROM SPRITE SHEET.
				// 			players[player][key[0]].height, 		// Sprite height. / TO CUT OUT FROM SPRITE SHEET.
				// 			players[player][key[0]].x, 				// Player x position. / WHERE TO POSITION ON CANVAS.
				// 			players[player][key[0]].y, 				// Player y position. / WHERE TO POSITION ON CANVAS.
				// 			players[player][key[0]].width, 			// Sprite width. / WHERE TO POSITION ON CANVAS.
				// 			players[player][key[0]].height 			// Sprite height. / WHERE TO POSITION ON CANVAS.
				// 			) // Takes sprite four corners from sprite sheet.
				// 		}
				// 	}
				window.addEventListener("keydown", function(e) { // Catch key input. e is event. This is NOT the DOWN key. It means when a button is pushed down. 
					keys[e.key] = true;
					// console.log(keys)
				});
				window.addEventListener("keyup", function(e) { // This removes pressed key from array when released by the user.  
					delete keys[e.key]
					activePlayers[uniqueId].moving = false;
				});		
