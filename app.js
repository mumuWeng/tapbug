function showStartPage () {
	document.getElementById("startPage").style = "display: block";
	document.getElementById("gamePage").style = "display: none";
	document.getElementById("dialog").style = "display: none";
	if (document.getElementById("level1").checked) {
		displayScore("level1");
	} else {
		displayScore("level2");
	}
}


function showGamePage () {
	document.getElementById("startPage").style = "display: none;";
	document.getElementById("gamePage").style = "display: block;";
	document.getElementById("dialog").style = "display: none";
	startGame(1);
}

function showDialog (score1, score2) {
	document.getElementById("dialog").style = "display: block;";
	document.getElementById("final-score").innerText = "Level 1 score: " + score1 + "\nLevel 2 score: " + score2;
}

function storeScore(score1, score2) {
	if (localStorage.hasOwnProperty("level1")) {
		if (score1 > localStorage.level1) {
			localStorage.setItem("level1", score1);
		}
		if (score2 > localStorage.level2) {
			localStorage.setItem("level2", score2);
		}
	}
	else {
		localStorage.setItem("level1", score1);
		localStorage.setItem("level2", score2);
	}
}


function highestScore(level) {
	if (level == 1) {
		displayScore("level1");
	} else {
		displayScore("level2");
	}
}


function displayScore(level) {
	if (score = localStorage.getItem(level)) {
		document.getElementById("highScore").innerText = score;
	} else {
		document.getElementById("highScore").innerText = 0;
	}
}

window.onload = showStartPage;
