const WIN_WIDTH = 640, WIN_HEIGHT = 480;
const TILE_SIZE = 24;
const SCALE = 2;
const TILE_SCALE = TILE_SIZE * SCALE;

const PLAYER_NAME = "Иванов";

/**
 * @enum
 */
const ENTITY_STATES = {
    IDLE: "IDLE",
    WALK: "WALK",
    HIT: "HIT"
}

/**
 * @enum
 */
const DIR = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT"
}


function background(color = "#000") {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
    ctx.restore();
}

function point(x, y, color = "#f00") {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x - 1, y - 1, 3, 3);
    ctx.restore();
}

function findAuto(arrInteractable) {
    for (let i of arrInteractable) {
        if (i.automatic) return i;
    }
    return null;
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(...args) {
        if (args[0] instanceof Vector) {
            this.x += args[0].x;
            this.y += args[0].y;
        } else {
            this.x += args[0];
            this.y += args[1];
        }
    }

    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }
    
    scale(sx, sy) {
        this.x *= sx;
        this.y *= sy;    
    }
}

Vector.dist = function (vec1, vec2) {
    return Math.sqrt((vec1.x - vec2.x)**2 + (vec1.y - vec2.y)**2);
}


class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get bounds() {
        return [this.x, this.y, this.width, this.height];
    }
}

class Sprite {
    constructor(img, ...args) {
        this._img = img;
        if (args[0] instanceof Rect) {
            this.rect = args[0];
        } else if (args.length == 4) {
            this.rect = new Rect(...args);
        } else {
            this.rect = new Rect(0, 0, 0, 0);
        }        
    }

    render(x, y, w = this.rect.width, h = this.rect.height) {
        ctx.drawImage(this._img,
            this.rect.x, this.rect.y,
            this.rect.width, this.rect.height,
            x, y, w, h);
    }
}