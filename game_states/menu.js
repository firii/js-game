class MenuState extends GameState {
    constructor() {
        super();
        this.logo = new Sprite(Assets.getImage("logo"), 0, 0, 118, 52);
    }

    handleInput(ctrl) {
        if (ctrl.isKeyPressed("Enter")) {
            this.newState = "MAIN_GAME";
        }
    }

    update() {
        
    }

    render(ctx) {
        background(ctx, "#e6f0f7");
        this.logo.render(ctx, 143, 20, 118 * 3, 52 * 3);
    }
}