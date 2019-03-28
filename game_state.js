class GameState {
    constructor() {
        this.isDone = false;
        this.newState = null;

        console.log("created state:");
        console.log(this);
        
    }

    handleInput(ctrl) { }

    update() { }

    render(ctx) { }
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
            case "MENU_STATE": state = new MenuState(); break;
            case "MAIN_STATE": state = new MainState(); break;
        }
        this.stateStack.push(state);
    }

    pop() {
        this.stateStack.pop();
    }
}