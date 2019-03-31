class MainGameState extends GameState {
    constructor() {
        super();
        this.player = new Player(0, 0);

        this.level1 = new TileMap(Assets.get("level1"));
        
    }

    handleInput(ctrl) {
        if (ctrl.isKeyDown("Escape")) {
            this.isDone = true;
        }
        
        if (ctrl.isKeyPressed("KeyW"))
            this.player.dy = -this.player.movSpeed;
        
        if (ctrl.isKeyPressed("KeyS"))
            this.player.dy = this.player.movSpeed;
            
        if (ctrl.isKeyPressed("KeyD"))
            this.player.dx = this.player.movSpeed;
            
        if (ctrl.isKeyPressed("KeyA"))
            this.player.dx = -this.player.movSpeed;
            
    }

    update() {
        this.player.update();
    }

    render(ctx) {
        // background(ctx, "#06f");
        this.level1.render(ctx, 0, 0);
        this.player.render(ctx);
    }
}