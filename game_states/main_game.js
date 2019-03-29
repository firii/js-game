class MainGameState extends GameState {
    constructor() {
        super();
        this.player = new Sprite(Assets.getImage("player"), 24, 0, 24, 24);
    }

    handleInput(ctrl) {
        if (ctrl.isKeyDown("Escape")) {
            this.isDone = true;
        }
    }

    update() {
        
    }

    render(ctx) {
        background(ctx, "#06f");
        this.player.render(ctx, 0, 0, 72, 72);
    }
}