function showStartPage () {
	document.getElementById("startPage").style = "display: block";
	document.getElementById("gamePage").style = "display: none";
}

function showGamePage () {
	showPage();
}

function showPage() {
	document.getElementById("startPage").style= "display: none;";
	document.getElementById("gamePage").style= "display: block;";
	startGame(1);

	// context.clearRect(0, 0, canvas.width, canvas.height);
}

/* Taewoo: dont need this part
function showPage2() {
	document.getElementById("startPage").style= "display: none;";
	document.getElementById("gamePage").style= "display: block;";
	document.getElementById("levelTitle").innerText= "Level 2";
	startGame(2);

	// context.clearRect(0, 0, canvas.width, canvas.height);
}

*/