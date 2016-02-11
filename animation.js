var gameCanvas;
var gameContext;
var infoCanvas;
var infoContext;
var bugSizeR = 15;
var foodSize = 25;
var moveUnit = 2;
var level;
var isPaused;
var isFinished;
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
	isFinished = false;
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


function createBug() {
	createBugTimeout = setTimeout(function() {
		if (!isPaused) {
			var xPosition = parseInt(350*Math.random() + 25) //10~380 with bug's radius 15
			var color = Math.random();

			if (color < 0.4) { //40%
				color = "orange";
			} else if (color < 0.7) { //30%
				color = "red";
			} else { //30%
				color = "black";
			}

			var bug = new Bug(xPosition, color);
			bugs.push(bug);
		}
		createBug();
	}, (2*Math.random() + 1) * 1000); // 1s ~ 3s      (2*Math.random() + 1) * 1000
}


function tapBug(event) {
	if (isPaused)
		return;

	var x = event.offsetX;
    var y = event.offsetY;

	for (var i = 0; i < bugs.length; i++) {
		if ((bugs[i].getExist()) &&
			Math.sqrt(Math.pow(bugs[i].getX() - x, 2) + Math.pow(bugs[i].getY() - y, 2))
			< 30 + bugSizeR) {
			bugs[i].killBug();
			if (level == 1) {
				score1 += bugs[i].getScore();
			} else {
				score2 += bugs[i].getScore();
			}
			updateScore();
		}
   }
}


function clearArc(x, y) {
    gameContext.globalAlpha = 1;
    gameContext.beginPath();
    gameContext.arc(x, y, bugSizeR+1, 0, 2*Math.PI);
    gameContext.fillStyle = "white";
    gameContext.fill();
}


function displayTime() {
	time--;
	updateTime();
	if (time == 0) {
		gameOver(false);
	}
}


function clearGame() {
	isFinished = true;
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
