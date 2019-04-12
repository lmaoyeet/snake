function Snake() {
    // variables to use in game
    this.tail = 1;
    this.trail = [];
    this.xv;
    this.yv;
    this.x;
    this.y;

    // to draw the actual snake
    this.draw = function() {
        c.fillStyle = snakeColor;
        for (var i = 0; i < trail.length; i++) {
            c.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
            if (trail[i].x == playerX && trail[i].y == playerY) {
                nextLife();
            }
        }
        trail.push({
            x: playerX,
            y: playerY
        });
        while (trail.length > tail) {
            trail.shift();
        }
    };
}