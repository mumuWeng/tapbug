var Food = function () {
	// create food. check wether this Food overlaps with other Foods
	var overlap = true;
	while(overlap) {
		this.x = parseInt(Math.random() * (400 - 2*foodSize) + foodSize);
		this.y = parseInt(Math.random() * (480 - 2*foodSize) + 120 + foodSize); // does not appear top 20% of canvas
		overlap = false;
		for (var i = 0; i < foods.length; i++) {
			if ((foods[i].x-foodSize < this.x+foodSize) && (foods[i].x+foodSize > this.x-foodSize)
				&& (foods[i].y-foodSize < this.y+foodSize) && (foods[i].y+foodSize > this.y-foodSize)) {
				overlap = true;
				break;
			}
		}
	}

	this.exist = true;

	var img = document.getElementById("food");
	gameContext.drawImage(img, this.x-foodSize, this.y-foodSize, foodSize*2, foodSize*2);

	// remove this food from canvas
	this.removeFood = function() {
		gameContext.clearRect(this.x-foodSize, this.y-foodSize, foodSize*2, foodSize*2);
	}

	// true if bug hits this food
	this.isHit = function(x, y) {
		return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)) < foodSize+bugSizeR;
	}
}


function findClosestFood(x, y) {
    var closestDistance = Number.POSITIVE_INFINITY;
    var currDistance;
    var closestFood = null;
    for (var i = 0; i < 5; i++) {
        if (!foods[i].exist) 
            continue;
        var currDistance = Math.pow(foods[i].x - x, 2) + Math.pow(foods[i].y - y, 2);
        if (closestDistance > currDistance) {
            closestDistance = currDistance;
            closestFood = foods[i];
        }
    }
    return closestFood;
}
