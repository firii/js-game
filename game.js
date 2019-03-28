class Game {
    constructor() {
        // Setting up the canvas context to draw on
        let canvas = document.getElementById("game-canvas");
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.ctrl = new Controller();

        this.stateMng = new StateManager();
        this.stateMng.push("MENU_STATE");

        this.done = false;
    }

    handleInput() {
        this.stateMng.curState.handleInput(this.ctrl);
    }

    update() {
        this.stateMng.curState.update();

        if (!(this.stateMng.curState.newState === null)) {
            this.stateMng.pushNewState();
        }

        if (this.stateMng.curState.isDone) {
            this.stateMng.pop();
        }

        this.ctrl.update();
    }

    render() {
        this.stateMng.curState.render(this.ctx);
    }

}
