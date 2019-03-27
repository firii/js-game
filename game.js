class Game {
    constructor() {
        let canvas = document.getElementById("game-canvas");
        this.ctx = canvas.getContext("2d");

        this.controller = new Controller();

        this.done = false;
    }

    render() {
        background(this.ctx)
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