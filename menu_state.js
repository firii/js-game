class MenuState extends GameState {
    constructor() {
        super();
        this.logo = new Sprite(Assets.getImage("logo"), 0, 0, 128, 62);
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
        this.logo.render(ctx, 320 - 64, 0);
    }
}