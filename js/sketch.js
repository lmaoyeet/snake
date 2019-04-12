// Variables
var snek = new Snake();                       // I declared the Snake constructor function in snake.js
var a = new Apple();                          // make the item to pick up (apple)
var highScore = 0;                            // initialize the highscore
var speed = 14;                               // twelve seems to be good sped
var appleColor = "#d63031";                   // color of item to pick up
var pageColor = '#dcdde1';                    // color of page background
var backgroundColor = "#ffda79";              // color of game background
var snakeColor = "#009432";                   // color of snake
var size = 20;                                // size of entire world
var deaths = 0;                               // deathcount
start(); // all other values that I don't want to write more than once

window.onload = function() {
    canv = document.getElementById("canvas");
    c = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
};


// the main animation and stuff
function draw() {

    // to set highscore variable
    if(snek.tail-1>highScore) {
        highScore = snek.tail -1;
    }

    // to start the snake in the directions by arrow keys ig
    snek.x += snek.xv;
    snek.y += snek.yv;

    // to deal with the wall collisions
    walls();

    // to draw background
    background(backgroundColor);

    // to draw snake
    c.fillStyle = snakeColor;
    for (var i = 0; i < snek.trail.length; i++) {
        c.fillRect(snek.trail[i].x * gs, snek.trail[i].y * gs, gs - 2, gs - 2);
        if (snek.trail[i].x == snek.x && snek.trail[i].y == snek.y && document.getElementById("score").innerHTML != 0) {
            init();
        }
    }
    snek.trail.push({
        x: snek.x,
        y: snek.y
    });
    while (snek.trail.length > snek.tail) {
        snek.trail.shift();
    }


    // to draw apple
    if (a.x == snek.x && a.y == snek.y) {
        snek.tail++;
        a.move();
    }
    a.draw();

    // update score? lmao
    updateScore();
}



// update score
function updateScore() {
    document.getElementById("score").innerHTML = snek.tail - 1;
}

// handle keypresses
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
            snek.xv = -1;
            snek.yv = 0;
            break;
        case 38:
            snek.xv = 0;
            snek.yv = -1;
            break;
        case 39:
            snek.xv = 1;
            snek.yv = 0;
            break;
        case 40:
            snek.xv = 0;
            snek.yv = 1;
            break;
    }
}

// to show the canvas
function show() {
    canvas.style.display = "inline";
    // eval(element + ".style.display='inline'");
}

// to hide the canvas
function hide() {
    canvas.style.display = "none";
    // eval(element + ".style.display='none'");
}

// to hide the button
function hideMenu() {
    document.getElementById("start").style.display = 'none';
}

// to show the button
function showMenu() {
    document.getElementById("start").style.display = 'inline';
}

// handling wall collision
function walls() {
    if (snek.x < 0) {
        snek.x = tc - 1;
    }
    else if (snek.x > tc - 1) {
        snek.x = 0;
    }
    else if (snek.y < 0) {
        snek.y = tc - 1;
    }
    else if (snek.y > tc - 1) {
        snek.y = 0;
    }
}

// changing background color
function background(cc) {
    c.fillStyle = cc;
    c.fillRect(0, 0, canv.width, canv.height);
}
// for animation
var gameTime;
function run() {
    gameTime = setInterval(draw, 1000 / speed);
    hideMenu();
    show();
}

// like the init function but is used throughout the program once more
function start() {
    snek.x = snek.y = 10; // snake starting point
    gs = tc = size; // boundaries of world
    a.x = a.y = 15; // initialize apple coords
    snek.xv = snek.yv = 0; // snake starting velocity
    snek.trail = [];       // just the head exists
    snek.tail = 1;         // ^
}

// stop the game if it was going, then reinitialize all values (except of course the highscore and death count)
function init() {

    // stop game
    clearInterval(gameTime);
    
    // initialize values
    start();

    // up the death count (bc this function is used when the player dies)
    deaths++;

    // show the try again? thing
    document.querySelector("a").innerHTML = "Try again? <br><br> Deaths: " + deaths + "<br> Highscore: " + highScore;
    showMenu();

    // change background
    c.fillStyle = pageColor;
    c.fillRect(0, 0, canv.width, canv.height);
}

