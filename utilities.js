const WIN_WIDTH = 640, WIN_HEIGHT = 480;

function background(ctx, l_color = "#000") {
    ctx.save();
    ctx.fillStyle = l_color;
    ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
    ctx.restore();
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    substract(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }
}

class Rect {
    constructor (x, y, width, height) {
        this.pos = new Vector(x, y);
        this.size = new Vector(width, height);
    }
}
