var Bug = function (initialX, color) {
    var x = initialX;
    var y = 0;
    this.color = color;
    var score;
    var speed;
    var exist = true; // alive. moving around
    var removed = false; // completely removed. removed = false if bug is fading out
    var moveInterval;
    var moveawayFlag = true; // can move away iff this flag is true. race condition.
    var moveawayTimeout;

    if (color == "black") {
        score = 5;
        speed = moveUnit * ((level == 1) ? 7 : 5); //ms per 1px move
    } else if (color == "red") {
        score = 3;
        speed = moveUnit * ((level == 1) ? 14 : 10);
    } else {
        score = 1;
        speed = moveUnit * ((level == 1) ? 17 : 12);
    }

    moveInterval = setInterval(move, speed);

    // to make bug move towards a food
    var prevFood = null;
    var ratioCount = 0;

    // move bug
    function move() {
        if (isFinished || !exist) {
            clearInterval(moveInterval);
            clearArc(x, y);
            return;
        }
        if (isPaused)
            return;

        //get next (x, y) location
        var closestFood = findClosestFood(x, y);
        if (!closestFood) {
            return;
        }
        var xDistance = Math.abs(closestFood.x - x);
        var yDistance = Math.abs(closestFood.y - y);

        if (xDistance == 0  || yDistance == 0) {
            ratioCount = 1;
        } else if ((prevFood != closestFood) || ratioCount < 0) {
            if (xDistance > yDistance) {
                ratioCount = parseInt(xDistance / yDistance);
            } else {
                ratioCount = parseInt(yDistance / xDistance);
            }
        }
        prevFood = closestFood;

        var tempX = x, tempY = y;
        if ((xDistance > yDistance && ratioCount != 0) || (xDistance < yDistance && ratioCount == 0)) {
            if (closestFood.x > x) {
                tempX = x + moveUnit;
            } else {
                tempX = x -moveUnit;
            }
            ratioCount--;               
        } else {
            if (closestFood.y > y) {
                tempY = y + moveUnit;
            } else {
                tempY = y - moveUnit;
            }
            ratioCount--;
        }

        // collision detection and avoidance
        for (var i = 0; i < bugs.length; i++) {
            if (!bugs[i].getRemoved() && !(bugs[i].getX() == x && bugs[i].getY() == y) &&
                Math.sqrt(Math.pow(bugs[i].getX() - tempX, 2) + Math.pow(bugs[i].getY() - tempY, 2))
                < 2 * bugSizeR) { // check overlap

                if (!bugs[i].getExist()) { // fading out
                    return;
                } else if (color == 'black') {
                    if (bugs[i].color == 'black') {
                        if (bugs[i].getX() < tempX) {
                            bugs[i].moveaway(-1);
                        }
                    } else {
                        if (bugs[i].getX() < tempX) {
                            bugs[i].moveaway(-1);   
                        } else {
                            bugs[i].moveaway(1);
                        }
                    }
                } else if (color == 'red') {
                    if (bugs[i].color == 'red' && bugs[i].getX() < tempX) {
                        bugs[i].moveaway(-1);
                    } else if (bugs[i].color == 'orange') {
                        if (bugs[i].getX() < tempX) {
                            bugs[i].moveaway(-1);   
                        } else {
                            bugs[i].moveaway(1);
                        }
                    }
                } else { // orange
                    if (bugs[i].color == 'orange' && bugs[i].getX() < tempX) {
                        bugs[i].moveaway(-1);
                    }
                }
                ratioCount++;
                return;
            }
        }

        // move bug and update (x, y)
        gameContext.save();
        clearArc(x, y);
        drawBug(tempX, tempY, color, 1);
        gameContext.restore();

        x = tempX;
        y = tempY;

        // if bug htis food, remove food. end game if there is no food left
        if (closestFood.isHit(x, y)) {
            closestFood.exist = false;
            closestFood.removeFood();

            var noFood = true;
            for (var i = 0; i < foods.length; i ++) {
                if (foods[i].exist) {
                    noFood = false;
                    break;
                }
            }
            if (noFood) {
                gameOver(true);
            }
        }
    }

    // a bug can order moveaway to other bugs
    this.moveaway = function(direction, force) {
        if (force == undefined)
            force = false;
        if (force) {
            moveawayFlag = true;
            clearTimeout(moveawayTimeout);
        }

        // critical section
        if (moveawayFlag) {
            moveawayFlag = false;
            clearInterval(moveInterval); // stop its original moving
            moveawayTimeout = setTimeout(function() {
                var tempX = x + (moveUnit * direction);

                // check collision. If there is collision, force the overlapping bug to moveaway.
                for (var i = 0; i < bugs.length; i++) {
                    if (!bugs[i].getRemoved() && !(bugs[i].getX() == x && bugs[i].getY() == y)  &&
                        Math.sqrt(Math.pow(bugs[i].getX() - tempX, 2) + Math.pow(bugs[i].getY() - y, 2))
                        < 2 * bugSizeR) {
                        if (bugs[i].getExist())
                            bugs[i].moveaway(direction, true);
                        moveawayFlag = true;
                        moveInterval = setInterval(move, speed);
                        return;
                    }
                }

                gameContext.save();
                clearArc(x, y);
                x = tempX;
                drawBug(x, y, color, 1);
                gameContext.restore();

                moveInterval = setInterval(move, speed); // resume its original moving
                moveawayFlag = true;
            }, speed)
        }
    }

    // remove bug immediately from the canvas
    this.removeBug = function() {
        exist = false;
        clearInterval(moveInterval);
        removed = true;
        clearArc(x, y);
    }

    // fade out bug for 2 seconds
    this.killBug = function() {
        exist = false;
        clearInterval(moveInterval);
        var alpha = 1;
        fadeOut();
        function fadeOut () {
            setTimeout(function() {
                alpha -= 0.05;
                clearArc(x, y);
                if (!removed && alpha >= 0) {
                    drawBug(x, y, color, alpha);
                    fadeOut();
                } else {
                    removed = true;
                }
            }, 100);
        }
    }

    this.getScore = function() { return score; }
    this.getX = function() { return x; }
    this.getY = function() { return y; }
    this.getRemoved = function() { return removed; }
    this.getExist = function() { return exist; }
}



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
