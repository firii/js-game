class MainState extends GameState {
    constructor() {
        super();

    }

    handleInput(ctrl) {
        if (ctrl.isKeyDown("Escape")) {
            this.isDone = true;
            console.log("MainState finished");
        }
    }

    update() {
        
    }

    render(ctx) {
        background(ctx, "#06f");
    }
}