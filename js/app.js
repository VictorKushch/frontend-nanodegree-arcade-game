var Game = function() {
	this.gameOver = false;
	this.gameWin = false;
    this.gameScore = 200;
};

//Character superclass

var Character = function(x,y){
//setting position
    this.x = x;
    this.y = y;

};

Character.prototype.update = function(){

};

Character.prototype.reset = function() {

};

Character.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

inherit = function(subClass,superClass) {
   subClass.prototype = Object.create(superClass.prototype); // delegate to prototype
   subClass.prototype.constructor = subClass; // set constructor on prototype
};




// Enemies our player must avoid
var Enemy = function(x,y) {
    Character.call(this, x, y);
    //setting image for enemy
    this.sprite = 'images/enemy-bug.png';

    this.multiplier = Math.floor((Math.random() * 5) + 1);

};

inherit(Enemy,Character);
 console.log(Enemy);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + 50 * dt * this.multiplier;
    //collision detection
    if (this.y == player.y && ((this.x < player.x + 20) && (this.x > player.x - 20))){
        Game.gameScore -= 100;
        element = document.getElementById('score').innerHTML = 'Score: ' + Game.gameScore;

        if (Game.gameScore <= 0){
            Game.gameOver = true;
        }

        //resesing player to start position
        player.reset();
    }
//restarting enemy instance when it reach right side of screen
    if (this.x > 505){
            this.reset();
        }

    };
// reset enemy to the left side with 3 random y options
Enemy.prototype.reset = function() {
    this.x = -200;
    var yValues = [60, 140, 220];
    this.y = yValues[Math.floor(Math.random()*3)];
};


//
//  PLAYER CLASS
//

//Player constructor

var Player = function(x,y){
    Character.call(this, x, y);
    this.sprite = 'images/char-boy.png';
};

inherit(Player,Character);
console.log(Player);


Player.prototype.reset = function(){
    //reset player to the start position
    this.x = 203;
    this.y = 380;

};
Player.prototype.update = function(){
    this.x = this.x;
    this.y = this.y;

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

// detection collision with the water
    if (this.y == "-20" ){
        Game.gameScore += 25;
        element = document.getElementById('score').innerHTML = 'Score: ' + Game.gameScore;

        //handling win of the game
        if (Game.gameScore > 700){
            Game.gameWin = true;
        }
        player.reset();

    }

};

/*
*
* Gems class
*
*/
//array of posible gem sprites available for all gem methods
var gems_array = ['Heart.png','Key.png','Star.png','Rock.png','Gem Blue.png','Gem Green.png', 'Gem Orange.png'];

var Gem = function(x, y){
    //chousing random sprite and x,y position for insrance
    this.sprite = 'images/' + gems_array[Math.floor(Math.random()*7)];
    var yValues = [60, 140, 220];
    var xValues = [3,103,203,303,403];
    this.x = xValues[Math.floor(Math.random()*5)];
    this.y = yValues[Math.floor(Math.random()*3)];


};

//creating new gem by collision detected
Gem.prototype.reset = function(){
    var yValues = [60, 140, 220];
    var xValues = [3,103,203,303,403];

    this.x = xValues[Math.floor(Math.random()*5)];
    this.y = yValues[Math.floor(Math.random()*3)];
    this.sprite = 'images/' + gems_array[Math.floor(Math.random()*7)];


};

Gem.prototype.update = function(){
    //detecting collision of gem with player
    if (this.y == player.y && ((this.x < player.x + 20) && (this.x > player.x - 20))){
        //score update
        Game.gameScore += 50;
        //updating frontend
        element = document.getElementById('score').innerHTML = 'Score: ' + Game.gameScore;
        //detecting win of the game
        if (Game.gameScore > 700){
            Game.gameWin = true;
        }
        //reset gem positin if collision detected
        this.reset();
    }
    this.x = this.x;
    this.y = this.y;
};

//gem instance rendering
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

//array of all gems
var allEnemies = [];

//start x position behind the screen
var x = -100;
for (var i = 0; i < 5; i++){
    var yValues = [60, 140, 220];
    var y = yValues[Math.floor(Math.random()*3)];
    var enemy = new Enemy(x, y);

    allEnemies.push(enemy);
}

//player object
var player = new Player(203, 380);

//Instantiate gems
var allGems = [];

//Creating 2 gems with 2 different placings
for (var j = 0; j < 3; j++){
        var gem = new Gem();
        //checking is array gems are already placed on that spot
        for (k = 0; k = allGems.size; k++){
            if (allGems[k].x == this.x && allGems[k].y == this.y){
                gem = new Gem();
            }
        }

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
