var gameCanvas;
var gameContext;
var infoCanvas;
var infoContext;
var bugSizeR = 15;
var foodSize = 25;
var level;
var isPaused;
var time;
var score1;
var score2;
var foods;
var bugs;
var timer;
var createBugTimeout;

function startGame(selectLevel) {
	level = selectLevel;
	isPaused = false;
	time = 60;
	bugs = [];
	foods = [];
	if (level == 1) {
		score1 = 0;
		score2 = 0;
	}

	initializeInfoBar();
	
	gameCanvas = document.getElementById("gameCanvas");
	gameContext = gameCanvas.getContext("2d");
	gameCanvas.width = 400;
	gameCanvas.height = 600;
	gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

	gameCanvas.addEventListener("mousedown", tapBug, false);

	// Start timer
	timer = setInterval(displayTime, 1000);

	// Put 5 foods
	for (var i = 0; i < 5; i++) {
		foods[i] = new Food();
	}
	
	createBug();
}


function tapBug(event) {
	if (isPaused)
		return;

	var x = event.offsetX;
    var y = event.offsetY;

	for (var i = 0; i < bugs.length; i++) {
		if ((bugs[i].exist) &&
			Math.sqrt(Math.pow(bugs[i].getX() - x, 2) + Math.pow(bugs[i].getY() - y, 2))
			< 30 - bugSizeR) {
			bugs[i].killBug();
			bugs[i].exist = false;
			if (level == 1) {
				score1 += bugs[i].getScore();
			} else {
				score2 += bugs[i].getScore();
			}
			updateScore();
		}
   }
}


function displayTime() {
	time--;
	updateTime();
	if (time == 0) {
		gameOver(false);
	}
}


function createBug() {
	createBugTimeout = setTimeout(function() {
		if (!isPaused) {
			var xPosition = parseInt(350*Math.random() + 25) //10~380 with bug's radius 15
			var color = Math.random();

			if (color < 0.3) { //30%
				color = "black";
			} else if (color < 0.6) { //30%
				color = "red";
			} else { //40%
				color = "orange";
			}

			var bug = new Bug(xPosition, color);
			bugs.push(bug);
		}
		createBug();
	}, (2*Math.random() + 1) * 1000); // 1s ~ 3s
}

var Bug = function (initialX, color) {
	var x = initialX;
	var y = 0;
	var score;
	var speed;
	this.exist = true; // alive. moving around
	var removed = false; // completely removed. Fading out is not removed.

	if (color == "black") {
		score = 5;
		speed = (level == 1) ? 7 : 5; //ms per 1px move
	} else if (color == "red") {
		score = 3;
		speed = (level == 1) ? 14 : 10;
	} else {
		score = 1;
		speed = (level == 1) ? 17 : 12;
	}

	var moveInterval = setInterval(move, speed);
	var prevFood = null;
	var ratioCount = 0;

	function move() {
		if (isPaused)
			return;

		gameContext.save();
		clearArc(x, y);
		
		// move bug
		var closestFood = findClosestFood(x, y);
		if (closestFood) {
			var xDistance = Math.abs(closestFood.x - x);
			var yDistance = Math.abs(closestFood.y - y);

			if (xDistance == 0  || yDistance == 0) {
				ratioCount = 1;
			} else if ((prevFood != closestFood) || ratioCount < 0) {
				if (xDistance > yDistance) {
					ratioCount = parseInt(xDistance / yDistance);
				} else {
					ratioCount = parseInt(yDistance / xDistance);
				}
			}
			prevFood = closestFood;

			if ((xDistance > yDistance && ratioCount != 0) || (xDistance < yDistance && ratioCount == 0)) {
				if (closestFood.x > x) {
					x++;
				} else {
					x--;
				}
				ratioCount--;				
			} else {
				if (closestFood.y > y) {
					y++;
				} else {
					y--;
				}
				ratioCount--;
			}

			drawBug(x, y, color, 1);
			gameContext.restore();

			if (closestFood.isHit(x, y)) {
				closestFood.exist = false;
				closestFood.removeFood();

				var noFood = true;
				for (var i = 0; i < foods.length; i ++) {
					if (foods[i].exist) {
						noFood = false;
						break;
					}
				}
				if (noFood) {
					gameOver(true);
				}
			}
		}
	}

	this.removeBug = function() {
		clearInterval(moveInterval);
		removed = true;
		clearArc(x, y);
	}

	this.killBug = function() {
		clearInterval(moveInterval);
		var alpha = 1;
		fadeOut();
		function fadeOut () {
			setTimeout(function() {
				alpha -= 0.05;
				clearArc(x, y);
				if (!removed && alpha >= 0) {
					drawBug(x, y, color, alpha);
					fadeOut();
				} else {
					removed = true;
				}
			}, 100);
		}
	}

	this.getScore = function() { return score; }
	this.getX = function() { return x; }
	this.getY = function() { return y; }
}


function clearArc(x, y) {
	gameContext.globalAlpha = 1;
	gameContext.beginPath();
	gameContext.arc(x, y, bugSizeR+1, 0, 2*Math.PI);
	gameContext.fillStyle = "white";
	gameContext.fill();
}


function findClosestFood(x, y) {
	var closestDistance = 10000000;
	var currDistance;
	var closestFood = null;
	for (var i = 0; i < 5; i++) {
		if (!foods[i].exist) 
			continue;
		var currDistance = Math.pow(foods[i].x - x, 2) + Math.pow(foods[i].y - y, 2);
		if (closestDistance > currDistance) {
			closestDistance = currDistance;
			closestFood = foods[i];
		}
	}
	return closestFood;
}


var Food = function () {
	// check wether this Food overlaps with other Foods
	var overlap = true;
	while(overlap) {
		this.x = parseInt(Math.random() * (400 - 2*foodSize) + foodSize);
		this.y = parseInt(Math.random() * (480 - 2*foodSize) + 120 + foodSize);
		overlap = false;
		for (var i = 0; i < foods.length; i++) {
			if ((foods[i].x-foodSize < this.x+foodSize) && (foods[i].x+foodSize > this.x-foodSize)
				&& (foods[i].y-foodSize < this.y+foodSize) && (foods[i].y+foodSize > this.y-foodSize)) {
				overlap = true;
				break;
			}
		}
	}

	this.exist = true;

	var img = document.getElementById("food");
	gameContext.drawImage(img, this.x-foodSize, this.y-foodSize, foodSize*2, foodSize*2);


	this.removeFood = function() {
		//gameContext.save();
		gameContext.clearRect(this.x-foodSize, this.y-foodSize, foodSize*2, foodSize*2);
		//gameContext.restore();
	}

	this.isHit = function(x, y) {
		return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)) < foodSize+bugSizeR;
	}
}


function clearGame() {
	clearTimeout(createBugTimeout);
	clearInterval(timer);
	for (var i = 0; i < bugs.length; i++) {
		bugs[i].removeBug();
	}
	gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}


function gameOver(noFood) {
	clearGame();
	if (level == 2 || noFood) {
		alert("Level 1 score: " + score1 + "\nLevel 2 score: " + score2);
		storeScore(score1, score2);
		showStartPage();
	} else {
		startGame(2);	
	}
}