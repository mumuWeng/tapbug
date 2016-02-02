function showGamePage () {
	if (document.getElementById ("level1").checked) {
		showPage1();
		debugger
	}
	if (document.getElementById ("level2").checked) {
		showPage2();
		debugger
	}
}

function showPage1 () {
	document.getElementById ("startPage").style= "display: none;";
	document.getElementById ("gamePage").style= "display: block;";
	document.getElementById ("level1").style= "display: block;";
	document.getElementById ("level2").style= "display: none;";
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function showPage2 () {
	document.getElementById ("startPage").style= "display: none;";
	document.getElementById ("gamePage").style= "display: block;";
	document.getElementById ("level1").style= "display: none;";
	document.getElementById ("level2").style= "display: block;";
	context.clearRect(0, 0, canvas.width, canvas.height);
}