class MainGameState extends GameState {
    constructor() {
        super();

        this.levels = {
            "hall": Assets.get("level1"),
            "math_room" : {}
        }

        this.curLevel = this.levels["hall"];

        this.tileMap = new TileMap(this.curLevel);
        console.log(this.tileMap);
        
        this.player = new Player(this.curLevel);
        this.enemies = this.populateEnemies();
        this.npc = this.populateNPCs();

    }

    changeLevel(level) {

    }

    populateEnemies() {
        
    }

    populateNPCs() {

    }

    handleInput(ctrl) {

        if (ctrl.isKeyPressed("KeyW"))
            this.player.dy = -this.player.movSpeed;
        
        if (ctrl.isKeyPressed("KeyS"))
            this.player.dy = this.player.movSpeed;
            
        if (ctrl.isKeyPressed("KeyD"))
            this.player.dx = this.player.movSpeed;
            
        if (ctrl.isKeyPressed("KeyA"))
            this.player.dx = -this.player.movSpeed;
   
        if (this.player.dx && this.player.dy) this.player.dy = 0;
    }

    update() {
        this.player.checkCollision(this.curLevel.solids, this.curLevel.tilemapDim[0]);
        this.player.update();

    }

    render(ctx) {
        background(ctx, "#000");

        let offsetX = (this.player.x + this.player.width / 2) * SCALE - WIN_WIDTH / 2;
        let offsetY = (this.player.y + this.player.height / 2) * SCALE - WIN_HEIGHT / 2;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > this.curLevel.tilemapDim[0] * TILE_SCALE - WIN_WIDTH)
            offsetX = this.curLevel.tilemapDim[0] * TILE_SCALE - WIN_WIDTH;
        if (offsetY < 0) offsetY = 0;
        if (offsetY > this.curLevel.tilemapDim[1] * TILE_SCALE - WIN_HEIGHT)
            offsetY = this.curLevel.tilemapDim[1] * TILE_SCALE - WIN_HEIGHT;

        ctx.save();
        ctx.translate(-offsetX, -offsetY);
        this.tileMap.render(ctx);
        this.player.render(ctx);
        ctx.restore();
    }
}