var Game = function() {
	this.gameOver = false;
	this.gameWin = false;
    this.gameScore = 200;
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
    this.x = this.x + 50 * dt * this.multiplier;
    //collision detection
    if (this.y == player.y && ((this.x < player.x + 20) && (this.x > player.x - 20))){
        Game.gameScore -= 100;
        console.log(Game.gameScore);
        element = document.getElementById('score').innerHTML = 'Score: ' + Game.gameScore;

        if (Game.gameScore <= 0){
            Game.gameOver = true;
            console.log(Game.gameOver);

        }
        if (Game.gameScore > 300){
            Game.GameWin = true;
        }


        player.reset();
    }



    if (this.x > 505){
        this.reset();
    }
};
// reset enemy to the left side with 3 random y options
Enemy.prototype.reset = function() {
    this.x = -200;
    var yValues = [60, 140, 220];
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



}

Player.prototype.reset = function(){
    //reset player to the start position
    this.x = 203;
    this.y = 380;

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


    if (this.y == "-20" ){
        console.log("+100!!");
        Game.gameScore += 100;
        element = document.getElementById('score').innerHTML = 'Score: ' + Game.gameScore;

        //handling end of the game
        if (Game.gameScore > 500){
            console.log('You won the game!');
            Game.gameWin = true;


        }
        player.reset();

    }

}

/*
*
* Gems class
*
*/

var Gem = function(x,y){
    var gems_array = ['Heart.png','Key.png','Star.png','Rock.png','Gem Blue.png','Gem Green.png', 'Gem Orange.png'];
    this.sprite = 'images/' + gems_array[Math.floor(Math.random()*7)];
    console.log(this.sprite);
    this.x = x;
    this.y = y;
    console.log(this.x, this.y);


}
Gem.prototype.reset = function(){



}
Gem.prototype.update = function(){
    this.x = this.x;
    this.y = this.y;
}


Gem.prototype.render = function() {
    var img = new Image();
        img.src = this.sprite;
        if (img.complete) {
            ctx.drawImage(img, this.x, this.y);
        }
};

/*
*
* INSTANTIONATE ALL OBJECTS
*
*/
var Game = new Game();


var allEnemies = [];

var x = -100;
for (var i = 0; i < 5; i++){
    var yValues = [60, 140, 220];
    var y = yValues[Math.floor(Math.random()*3)];
    var enemy = new Enemy(x, y);

    allEnemies.push(enemy);
}


var player = new Player(203, 380);

//Instantiate gems
var allGems = [];

var yValues = [60, 140, 220];
var xValues = [3,103,203,303,403];
for (var j = 0; j<2; j++){
    this.x = xValues[Math.floor(Math.random()*5)];
    this.y = yValues[Math.floor(Math.random()*3)];
    var gem = new Gem(this.x, this.y);
    allGems.push(gem);
}




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
