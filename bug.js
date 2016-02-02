function drawBug(x,y, color, alpha) {
    x = x - 6.3;
    y = y - 14;

    gameContext.globalAlpha = alpha;

	gameContext.beginPath();
    gameContext.lineWidth = 1;
    gameContext.strokeStyle = "#000000";
	gameContext.moveTo(x+1, y+1);
	gameContext.lineTo(x+3, y+2.5);
    gameContext.moveTo(x+9, y+2.5);
    gameContext.lineTo(x+12, y);

    gameContext.moveTo(x, y+16);
    gameContext.lineTo(x-1, y+15);
    gameContext.lineTo(x-3, y+11);
    gameContext.moveTo(x+11, y+16);
    gameContext.lineTo(x+13, y+15);
    gameContext.lineTo(x+15, y+11);

    gameContext.moveTo(x-1, y+20);
    gameContext.lineTo(x-4, y+20);
    gameContext.lineTo(x-6, y+22);
    gameContext.moveTo(x+13, y+20);
    gameContext.lineTo(x+16, y+20);
    gameContext.lineTo(x+18, y+22);

    gameContext.moveTo(x+1, y+24);
    gameContext.lineTo(x-1, y+26);
    gameContext.lineTo(x-1, y+28);
    gameContext.moveTo(x+11, y+24);
    gameContext.lineTo(x+13, y+26);
    gameContext.lineTo(x+13, y+28);
    gameContext.stroke();

    gameContext.beginPath();
    gameContext.moveTo(x+1,y+1);
    gameContext.lineTo(x+1, y+1.5);
    gameContext.lineTo(x, y+2);
    gameContext.lineTo(x+1, y+1);
    gameContext.moveTo(x+12, y+1);
    gameContext.lineTo(x+12, y+1.5);
    gameContext.lineTo(x+11, y+2);
    gameContext.lineTo(x+12, y+1);
    gameContext.stroke();


    /*-- Body parts --*/
    gameContext.beginPath();
    gameContext.arc(x+6, y+8, 5, 0, 2*Math.PI);
    gameContext.moveTo(x+6, y+12);
    gameContext.bezierCurveTo(x-5, y+13, x-5, y+25, x+6.5, y+25);
    gameContext.moveTo(x+6, y+12);	
    gameContext.bezierCurveTo(x+17, y+13, x+17, y+25, x+6.5, y+25);
    gameContext.fillStyle = color;
    gameContext.lineWidth = 1;
    gameContext.strokeStyle = "#666666";
    gameContext.stroke();
    gameContext.fill();

    /*-- Eyes and Mouth --*/
    gameContext.beginPath();
    gameContext.arc(x+4, y+5.5, 1, 0, 2*Math.PI);
    gameContext.arc(x+7, y+5.5, 1, 0, 2*Math.PI);
    gameContext.fillStyle = "black";
    gameContext.fill();
    gameContext.beginPath();
    gameContext.arc(x+6, y+7.5, 2.5, 0, Math.PI, false);
    gameContext.stroke();
}