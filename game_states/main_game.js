class MainGameState extends GameState {
    constructor() {
        super();
        this.player = new Player(0, 0);
    }

    handleInput(ctrl) {
        if (ctrl.isKeyDown("Escape")) {
            this.isDone = true;
        }
        this.player.handleInput(ctrl);
    }

    update() {
        
    }

    render(ctx) {
        background(ctx, "#06f");
        this.player.render(ctx);
    }
}