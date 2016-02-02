function showGamePage () {
	if (document.getElementById ("level1").checked) {
		showPage1();
	}
	if (document.getElementById ("level2").checked) {
		showPage2();
	}
}

function showPage1 () {
	document.getElementById ("startPage").style= "display: none;";
	document.getElementById ("gamePage").style= "display: block;";
	document.getElementById ("levelTitle").innerText= "Level 1";

	context.clearRect(0, 0, canvas.width, canvas.height);
}

function showPage2 () {
	document.getElementById ("startPage").style= "display: none;";
	document.getElementById ("gamePage").style= "display: block;";
	document.getElementById ("levelTitle").innerText= "Level 2";
	context.clearRect(0, 0, canvas.width, canvas.height);
}