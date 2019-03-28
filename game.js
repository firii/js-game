class Game {
    constructor() {
        let canvas = document.getElementById("game-canvas");
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.controller = new Controller();

        this.done = false;

        this.tile = new Image(24, 24);
        this.tile.src = "img/tile.png";
        this.tileLoaded = false;
        this.tile.onload = (function (e) {this.tileLoaded = true}).bind(this);
    }

    render() {
        background(this.ctx)
        let tilesize = 72;
        for (let i = 0; i < 640; i+= tilesize) {
            for (let j = 0; j < 480; j+= tilesize) {
                if (this.tileLoaded) {
                    this.ctx.drawImage(this.tile, i, j, tilesize, tilesize);
                }
            }
        }
    }

    update() {
        this.controller.update();
    }

    handleInput() {
        if (this.controller.isKeyDown("Escape")) {
            console.log("Game finished");
        }

        if (this.controller.isMouseDown()) {
            console.log(this.controller.getMouseX() +
            ", " + this.controller.getMouseY());
            
        }
    }
}
