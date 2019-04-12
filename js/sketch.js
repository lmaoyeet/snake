// variables i guess
var snek = new Snake();                       // I declared the Snake constructor function in snake.js
var a = new Apple();

var speed = 14;                               // twelve seems to be good sped
var appleColor = "#d63031";
var pageColor = '#dcdde1';
var backgroundColor = "#ffda79";
var snakeColor = "#009432";
var size = 20;
var gs, tc = size;
var deaths = 0;

a.x, a.y = 15;

// initialize the snake's values I guess
snek.x, snek.y = 10;
snek.xv=snek.yv = 0;
snek.tail = 1;
snek.trail = [];

window.onload = function() {
    canv = document.getElementById("canvas");
    c = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
};
var gameTime;
function run() {
    gameTime = setInterval(draw, 1000 / speed);
    hideMenu();
    show();
}
function init() {
    clearInterval(gameTime);
    snek.x = snek.y = 10;
    gs = tc = size;
    a.x = a.y = 15;
    snek.xv = snek.yv = 0;
    snek.trail = [];
    snek.tail = 1;
    deaths++;
    document.querySelector("a").innerHTML = "Try again?";
    showMenu();
    c.fillStyle = pageColor;
    c.fillRect(0, 0, canv.width, canv.height);
}
//nextLife();
snek.x = snek.y = 10;
gs = tc = size;
a.x = a.y = 15;
snek.xv = snek.yv = 0;
snek.trail = [];
snek.tail = 1;
function draw() {

    // for movement
    snek.x += snek.xv;
    snek.y += snek.yv;

    // to deal with the walls
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

    // to draw background
    c.fillStyle = backgroundColor;
    c.fillRect(0, 0, canv.width, canv.height);


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
    // apples collected
    updateScore();
}
function updateScore() {
    document.getElementById("score").innerHTML = snek.tail - 1;
}
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

function show() {
    canvas.style.display = "inline";
    // eval(element + ".style.display='inline'");
}

function hide() {
    canvas.style.display = "none";
    // eval(element + ".style.display='none'");
}
function hideMenu() {
    document.getElementById("start").style.display = 'none';
}
function showMenu() {
    document.getElementById("start").style.display = 'inline';
}