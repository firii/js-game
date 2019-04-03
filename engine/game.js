class Game {
    constructor() {
        // Setting up the canvas context to draw on
        let canvas = document.getElementById("game-canvas");
        this.ctx = canvas.getContext("2d");

        this.ctx.imageSmoothingEnabled = false;

        this.stateManager = new StateManager();
        this.stateManager.push("MENU");

        this.done = false;
    }

    handleInput() {
        this.stateManager.curState.handleInput();
    }

    update() {
        this.stateManager.curState.update();

        if (!(this.stateManager.curState.newState === null)) {
            this.stateManager.pushNewState();
        }

        if (this.stateManager.curState.isDone) {
            this.stateManager.pop();
        }

    }

    render() {
        this.stateManager.curState.render(this.ctx);
    }

}
