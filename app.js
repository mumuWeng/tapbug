function showStartPage () {
	document.getElementById("startPage").style = "display: block";
	document.getElementById("gamePage").style = "display: none";
}

function showGamePage () {
	showPage1();
}

function showPage1() {
	document.getElementById("startPage").style= "display: none;";
	document.getElementById("gamePage").style= "display: block;";
	document.getElementById("levelTitle").innerText= "Level 1";
	startGame(1);

	// context.clearRect(0, 0, canvas.width, canvas.height);
}

function showPage2() {
	document.getElementById("startPage").style= "display: none;";
	document.getElementById("gamePage").style= "display: block;";
	document.getElementById("levelTitle").innerText= "Level 2";
	startGame(2);

	// context.clearRect(0, 0, canvas.width, canvas.height);
}