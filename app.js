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
}