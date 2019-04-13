class Game {
    constructor() {

        this.stateManager = new StateManager();
        this.stateManager.push("MENU");
        this.stateManager.push("MAIN_GAME");

        this.done = false;
    }

    handleInput() {
        this.stateManager.curState.handleInput();
    }

    update() {
        if (!(this.stateManager.curState.newState === null)) {
            this.stateManager.pushNewState();
        }
        
        if (this.stateManager.curState.isDone) {
            this.stateManager.pop();
        }
        
        this.stateManager.curState.update();
    }

    render() {
        this.stateManager.curState.render();
    }

}
