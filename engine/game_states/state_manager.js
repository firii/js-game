class GameState {
    constructor() {
        this.isDone = false;
        this.newState = null;
    }

    handleInput() { }

    update() { }

    render() { }
}

class StateManager {
    constructor() {
        this.stateStack = [];
    }

    get curState() {
        return this.stateStack[this.stateStack.length - 1];
    }

    pushNewState() {
        let state = this.curState.newState;
        this.curState.newState = null;
        this.push(state);
    }

    push(stateName) {
        let state;
        switch (stateName) {
            case "MENU": state = new MenuState(); break;
            case "MAIN_GAME": state = new MainGameState(); break;
        }
        this.stateStack.push(state);
    }

    pop() {
        this.stateStack.pop();
    }
}