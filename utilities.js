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
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Sprite {
    constructor(img, ...args) {
        this.img = img;
        if (args[0] instanceof Rect) {
            this.rect = args[0];
        } else if (args.length == 4) {
            this.rect = new Rect(...args);
        } else {
            this.rect = new Rect(0, 0, 0, 0);
        }        
    }

    render(ctx, x, y, w = this.rect.width, h = this.rect.height) {
        ctx.drawImage(this.img,
            this.rect.x, this.rect.y,
            this.rect.width, this.rect.height,
            x, y, w, h);
    }
}