function drawbug(x,y, color) {
	alpha = ".6";

	context.beginPath();

    context.lineWidth = 1;
    context.strokeStyle = "#000000";
	context.moveTo(x,y);
	context.lineTo(x+3, y+3.5);
    context.moveTo(x+9, y+3.5);
    context.lineTo(x+12, y);

    context.moveTo(x, y+16);
    context.lineTo(x-1, y+15);
    context.lineTo(x-3, y+11);
    context.moveTo(x+11, y+16);
    context.lineTo(x+13, y+15);
    context.lineTo(x+15, y+11);

    context.moveTo(x-1, y+20);
    context.lineTo(x-4, y+20);
    context.lineTo(x-6, y+22);
    context.moveTo(x+13, y+20);
    context.lineTo(x+16, y+20);
    context.lineTo(x+18, y+22);

    context.moveTo(x+1, y+26);
    context.lineTo(x-1, y+28);
    context.lineTo(x-1, y+31);
    context.moveTo(x+11, y+26);
    context.lineTo(x+13, y+28);
    context.lineTo(x+13, y+31);


    context.moveTo(x,y);
    context.lineTo(x, y+2);
    context.lineTo(x+1.5, y+1.5);
    context.lineTo(x, y);
    context.moveTo(x+12, y);
    context.lineTo(x+12, y+2);
    context.lineTo(x+13, y+1.5);
    context.lineTo(x+12, y);
    
    context.stroke();

    /*-- Body parts --*/
    context.beginPath();
    context.arc(x+6, y+8, 5, 0, 2*Math.PI);
    context.moveTo(x+6, y+12);
    context.bezierCurveTo(x-5, y+12, x-5, y+27, x+6.5, y+27);
    context.moveTo(x+6, y+12);	
    context.bezierCurveTo(x+17, y+12, x+17, y+27, x+6.5, y+27);
    context.fillStyle = color;
    context.lineWidth = 1;
    context.strokeStyle = "#666666";
    context.stroke();
    context.fill();

    /*-- Eyes and Mouth --*/
    context.beginPath();
    context.arc(x+4, y+5.5, 1, 0, 2*Math.PI);
    context.arc(x+7, y+5.5, 1, 0, 2*Math.PI);
    context.fillStyle = "black";
    context.fill();
    context.beginPath();
    context.arc(x+6, y+7.5, 2.5, 0, Math.PI, false);
    context.stroke();
}