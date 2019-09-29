			// canvas
				var canvas = document.getElementById('gameCanvas');
				var c = canvas.getContext('2d');
			// keyboard flags
				var left = false;
				var right = false;
			// ball properties
				var radius = 4;
				var x = 150;
				var y = 220;
				var xSpeed = 3;
				var ySpeed = 3;
				var maxSpeed = 6;
			// draw ball function
			function drawBall() {
				c.beginPath();
				c.arc(x, y, radius, 0, Math.PI*2);
				c.strokeStyle = '#a00';
				c.fillStyle = 'orange';
				c.lineWidth = 5;
				c.stroke();
				c.fill();
				c.closePath();
			}
			// player properties
				var width = 80;
				var height = 10;
				var player_x = canvas.width/2 - width/2;
				var player_y = canvas.height - height;
				var player_xSpeed = 0;
			// draw player function 
			function drawPlayer() {
				c.beginPath();
				c.fillStyle = '#09a';
				c.fillRect(player_x, player_y, width, height);
				c.closePath();
			}
			// draw gameover function
			function drawGameover() {
				c.beginPath();
				c.textAlign = 'center';
				c.textBaseline = 'middle';
				c.font = 'bold 28px sans-serif';
				// shadow text
				c.fillStyle = 'black';
				c.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2 + 2);
				// text
				c.fillStyle = 'red';
				c.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
			}
			// bricks properties
				var bricks = [];
				var brickRows = 3;
				var brickCols = 6;
				var brickWidth = 60;
				var brickHeight = 15;
				var brickPadding = 10;
				var brickOffsetTop = 50
				var brickOffsetLeft = 35;
			// create bricks objects
			for (var i = 0; i < brickRows; i++) {
				bricks[i] = [];
				for (var j = 0; j < brickCols; j++) {
					bricks[i][j] = {};
					bricks[i][j].visible = true;
					bricks[i][j].x = j * (brickWidth + brickPadding) + brickOffsetLeft;
					bricks[i][j].y = i * (brickHeight + brickPadding) + brickOffsetTop;
				}
			}
			// draw one brick
			function drawOneBrick(x, y) {
				c.beginPath();
				c.fillStyle = '#909';
				c.fillRect(x, y, brickWidth, brickHeight);
				c.closePath();
			}
			// bricks draw
			function drawBricks() {
				for (let r = 0; r < brickRows; r++) {
					for(let c = 0; c < brickCols; c++) {
						if (bricks[r][c].visible) {
							drawOneBrick(bricks[r][c].x, bricks[r][c].y);
						}
					}
				}				
			}
			// detect collision function
			function detectCollision() {
				for (let r = 0; r < brickRows; r++) {
					for(let c = 0; c < brickCols; c++) {
						var b = bricks[r][c];
						if (x + radius > b.x && x - radius< b.x + brickWidth && y + radius > b.y && y - radius < b.y + brickHeight && b.visible) {
							ySpeed *= -1;
							b.visible = false;
						}
					}
				}								
			}
			// draw loop function
			function draw() {
				// clear canvas every frame
				c.clearRect(0, 0, canvas.width, canvas.height);
				// draw ball
				drawBall();
				// draw player
				drawPlayer();
				// draw bricks
				drawBricks();
				// move player
				player_x += player_xSpeed;
				// listen to keyboard events
				if 		(left && player_x > 0) 						{ player_xSpeed = -7}
				else if (right && player_x < canvas.width - width) 	{ player_xSpeed = 7	}
				else 												{ player_xSpeed = 0 }
				// move circle
				x += xSpeed;
				y += ySpeed;
				// bounce on 3 walls
				if (x >= canvas.width  - radius || x <= radius) { xSpeed *= -1 }
				if (y <= radius) { ySpeed *= -1 }
				// game over
				else if (y >= canvas.height - radius) {
					drawGameover();
					clearInterval(loop);
				}
				// detect ball collision with player
				if (y - radius > player_y - height) {
					if (x < player_x + width && x > player_x) {
					// when ball is within the x cordination of player
						ySpeed = -3;
						// xSpeed = ((x - player_x) - (width/2)) / 20;
						xSpeed += Math.random() * player_xSpeed / 2;
					}
				}
				// detect ball collision with bricks
				detectCollision();
				// suppress ball's xSpeed
				if 		(xSpeed > maxSpeed) 	 { xSpeed = maxSpeed }
				else if (xSpeed < maxSpeed * -1) { xSpeed = maxSpeed * -1 }
			}
			var loop = setInterval(draw, 15);
			// keydown handler
			document.addEventListener('keydown', function (e) {
				switch(e.key) {
					case 'Right':
					case 'ArrowRight':
						right = true;
						break;
					case 'Left':
					case 'ArrowLeft':
						left = true;
						break;
				}
			});
			// keyup handler
			document.addEventListener('keyup', function (e) {
				switch(e.key) {
					case 'Right':
					case 'ArrowRight':
						right = false;
						break;
					case 'Left':
					case 'ArrowLeft':
						left = false;
						break;
				}				
			});
