class MenuState extends GameState {
    constructor() {
        super();
        this.logo = new Sprite(Assets.getImage("logo"), 0, 0, 118, 52);
        this.verLabel = new Label("ver. 0.0.1", 20, 10, 465);
        this.playButton = new Button("PLAY", 170, 200);
    }

    handleInput(ctrl) {
        this.playButton.handleInput(ctrl);
        if (this.playButton.isPressed) {
            this.newState = "MAIN_GAME";
        }
    }

    update() {
        this.playButton.update();
    }

    render(ctx) {
        background(ctx, "#e6f0f7");
        this.logo.render(ctx, 143, 20, 118 * 3, 52 * 3);
        this.verLabel.render(ctx);
        this.playButton.render(ctx);
    }
}