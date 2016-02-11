function initializeInfoBar() {
	infoCanvas = document.getElementById("infoCanvas");
	infoContext = infoCanvas.getContext("2d");
	infoCanvas.width = 400;
	infoCanvas.height = 50;
	infoContext.fillStyle = "#0A2A0A";
	infoContext.fillRect(0,0,infoCanvas.width,infoCanvas.height);
	infoCanvas.addEventListener("mousedown", pause, false);

	// pause or play button
	infoContext.font = "30px Comic Sans MS";
	infoContext.fillStyle = "white";
	infoContext.fillText("||", 185, 35); 

	// level
	infoContext.font = "15px Comic Sans MS";
	infoContext.fillStyle = "white";
	infoContext.fillText("Level " + level, 5, 15);

	// time
	infoContext.font = "15px Comic Sans MS";
	infoContext.fillStyle = "white";
	infoContext.fillText("Time: " + time + "s", 5, 45);

	// score
	infoContext.font = "15px Comic Sans MS";
	infoContext.fillStyle = "white";
	infoContext.fillText("Score: 0", 310, 30);
}

function pause() {
	infoContext.fillStyle = "#0A2A0A";
	infoContext.fillRect(180,0,50,50);

	isPaused = !isPaused;
	if (isPaused){
		clearInterval(timer);
		infoContext.font = "50px Comic Sans MS";
		infoContext.fillStyle = "white";
		infoContext.fillText("\u25B6", 185, 45);
	} else {
		timer = setInterval(displayTime, 1000);
		infoContext.font = "30px Comic Sans MS";
		infoContext.fillStyle = "white";
		infoContext.fillText("||", 185, 35); 
	}
}

function updateTime() {
	infoContext.fillStyle = "#0A2A0A";
	infoContext.fillRect(5,25,100,50);

	infoContext.font = "15px Comic Sans MS";
	infoContext.fillStyle = "white";
	infoContext.fillText("Time: " + time + "s", 5, 45);
}

function updateScore() {
	var score;
	if (level == 1) {
		score = score1;
	} else {
		score = score2;
	}

	infoContext.fillStyle = "#0A2A0A";
	infoContext.fillRect(310,0,90,50);

	infoContext.font = "15px Comic Sans MS";
	infoContext.fillStyle = "white";
	infoContext.fillText("Score: " + score, 310, 30);
}
