class MainGameState extends GameState {
    constructor() {
        super();

        this.levels = {
            "hall": Assets.get("level1"),
            "math_room" : {}
        }

        this.curLevel = this.levels["hall"];

        this.tileMap = new TileMap(this.curLevel);
        
        this.player = new Player(this.curLevel);
        this.enemies = this.populateEnemies();
        this.npc = this.populateNPCs();

        var spDialog = new Sprite(Assets.get("dialog"), 0, 0, 640, 135);
        this.dialogWin = new DialogWindow(0, 345, spDialog);
        this.dialogWin.showDialog("SANS", "ыыыыы ыыыыыыыы ыыыыы ыыы ыыыыыы ы ыыыы...");
    }

    changeLevel(level) {

    }

    populateEnemies() {
        
    }

    populateNPCs() {

    }

    

    handleInput() {

        
        this.player.handleInput();
        this.dialogWin.handleInput();
    }

    update() {
        this.player.checkCollision(this.curLevel.solids, this.curLevel.tilemapDim[0]);
        this.player.update();

        this.dialogWin.update();
        if (this.dialogWin.getAnswer()) {
            this.dialogWin.showDialog("SANS", "so what do you think?",
            ["wait what?", "*uhm, okay"], 600);
        }
        if (this.dialogWin.isTimeUp()) {
            this.dialogWin.showDialog("SANS", "so be it!\nfight me!")
        }
    }

    render(ctx) {
        background(ctx, "#000");

        /**
         * @todo move all calculations in another place
         */
        let pX = this.player.x;
        let pY = this.player.y;
        let halfPW = this.player.width / 2;
        let halfPH = this.player.height / 2;

        let winWScale = WIN_WIDTH / SCALE;
        let winHScale = WIN_HEIGHT / SCALE;

        let offsetX = (pX + halfPW) * SCALE - WIN_WIDTH / 2;
        let offsetY = (pY + halfPH) * SCALE - WIN_HEIGHT / 2;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > this.curLevel.tilemapDim[0] * TILE_SCALE - WIN_WIDTH)
            offsetX = this.curLevel.tilemapDim[0] * TILE_SCALE - WIN_WIDTH;
        if (offsetY < 0) offsetY = 0;
        if (offsetY > this.curLevel.tilemapDim[1] * TILE_SCALE - WIN_HEIGHT)
            offsetY = this.curLevel.tilemapDim[1] * TILE_SCALE - WIN_HEIGHT;

        let beginRenderX = Math.floor((pX + halfPW - winWScale / 2) / TILE_SIZE);
        let beginRenderY = Math.floor((pY + halfPH - winHScale / 2) / TILE_SIZE);
        let endRenderX = Math.ceil((pX + halfPW + winWScale / 2) / TILE_SIZE);
        let endRenderY = Math.ceil((pY + halfPH + winHScale / 2) / TILE_SIZE);

        if (beginRenderX < 0) {
            beginRenderX = 0;
            endRenderX = Math.ceil(winWScale / TILE_SIZE);
        }
        if (beginRenderY < 0) {
            beginRenderY = 0;
            endRenderY = Math.ceil(winHScale / TILE_SIZE);
        }
        if (endRenderX > this.tileMap.width) {
            endRenderX = this.tileMap.width;
            beginRenderX = endRenderX - Math.floor(winWScale / TILE_SIZE) - 1;
        }
        if (endRenderY > this.tileMap.height) {
            endRenderY = this.tileMap.height;
            beginRenderY = endRenderY - Math.floor(winHScale / TILE_SIZE) - 1;
        }

        // render on map objects
        ctx.save();
        ctx.translate(-offsetX, -offsetY);
        this.tileMap.render(ctx, beginRenderX, beginRenderY, endRenderX, endRenderY);
        this.player.render(ctx);
        ctx.restore();

        // display GUI
        this.dialogWin.render(ctx);
    }
}