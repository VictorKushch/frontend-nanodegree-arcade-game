var Game = function() {
	this.gameOver = false;
	this.gameWin = false;
};

// Enemies our player must avoid
var Enemy = function(x,y) {

    //setting image for enemy
    this.sprite = 'images/enemy-bug.png';

    //setting position

    this.x = x;
    this.y = y;

    this.multiplier = Math.floor((Math.random() * 5) + 1);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + 101 * dt * this.multiplier;
    if (this.x > 505){
        this.reset();
    }
};
// reset enemy to the left side with 3 random y options
Enemy.prototype.reset = function() {
    this.x = -200;
    var yValues = [60, 145, 230];
    this.y = yValues[Math.floor(Math.random()*3)];
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
//  PLAYER CLASS
//

//Player constructor

var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

    this.x_original_position = x;
    this.y_original_position = y;


}

Player.prototype.update = function(){
    this.x = this.x;
    this.y = this.y;
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//change players position based on key input
Player.prototype.handleInput = function(direction){

    if (direction == 'up' && this.y>-20){
        this.y -= 80;
        console.log('x: ', this.x, 'y: ', this.y);
    } else if (direction == 'down' && this.y<380) {
        this.y += 80;
        console.log('x: ', this.x, 'y: ', this.y);

    } else if (direction == 'right' && this.x<403 ) {
        this.x += 100;
        console.log('x: ', this.x, 'y: ', this.y);
    } else if (direction == 'left' && this.x>3) {
        this.x -= 100;
        console.log('x: ', this.x, 'y: ', this.y);

    }



}



/*
*
* INSTANTIONATE ALL OBJECTS
*
*/

var allEnemies = [];

var x = -100;
for (var i = 0; i < 5; i++){
    var yValues = [60, 145, 230];
    var y = yValues[Math.floor(Math.random()*3)];
    var enemy = new Enemy(x, y);

    allEnemies.push(enemy);
}


var player = new Player(203, 380);

var Game = new Game();




// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
