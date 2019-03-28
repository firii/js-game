class MenuState extends GameState {
    constructor() {
        super();

    }

    handleInput(ctrl) {
        if (ctrl.isKeyPressed("Enter")) {
            this.newState = "MAIN_STATE";
        }
    }

    update() {
        
    }

    render(ctx) {
        background(ctx, "#f60");
    }
}