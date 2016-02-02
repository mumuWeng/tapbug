var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event) {
	var x = event.offsetX;
	var y = event.offsetY;

	drawbug(x,y, "#FFA500")
}