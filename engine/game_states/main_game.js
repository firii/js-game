class MainGameState extends GameState {
    constructor() {
        super();

        this.levels = {
            "hall": Assets.get("level1"),
        }
        this.curLevel = this.levels["hall"];


        this.tileMap = new TileMap(this.curLevel);
        

        this.player = new Living(Assets.get("anim_player"),
        ...this.curLevel.playerPos);
        this.player._facing = DIR.DOWN;


        this.interactable = this.populateInteractable();
        this.sortFunc = (function (a, b) {
            return Vector.dist(a.pos, this.pos) - Vector.dist(b.pos, this.pos)
        }).bind(this.player);


        this.se = new ScriptEngine(this);
        this.requestAction = false;

        var spDialog = new Sprite(Assets.get("dialog"), 0, 0, 640, 135);
        this.dialogWin = new DialogWindow(0, 345, spDialog);
        // this.dialogWin.showDialog("Баб Зина", ["por favor parlor de folar"], ["Muchios", "Gracias"]);
    }

    changeLevel(levelName) {

    }

    populateInteractable() {
        let result = [];
        for (let i of this.curLevel.population) {
            result.push(new Interactable(i));
        }
        return result;
    }
    

    handleInput() {

        if (!this.se.inActionLoop) {
            if (ctrl.isKeyPressed("KeyW")) this.player.dy = -this.player.movSpeed;
            if (ctrl.isKeyPressed("KeyS")) this.player.dy = this.player.movSpeed;
            if (ctrl.isKeyPressed("KeyD")) this.player.dx = this.player.movSpeed;
            if (ctrl.isKeyPressed("KeyA")) this.player.dx = -this.player.movSpeed;
    
            // cancel diagonal movement
            if (this.player.dx && this.player.dy) this.player.dy = 0;

            // handle player press to activate interactable object
            if (ctrl.isKeyDown("KeyE")) this.requestAction = true;
        }

        this.dialogWin.handleInput();
    }

    update() {
        this.interactable.forEach((inter) => {inter.update()});

        if (!this.se.inActionLoop) {
            // if players is currently not in action loop,
            // meaning no dialog is displayed or automatic action performed
            // we look through interactable objects in range of activation
            let avaliable = [];
            for (let inter of this.interactable) {         
                if (Vector.dist(inter.pos, this.player.pos) < inter.activationRadius) {
                    avaliable.push(inter);
                }
            }
    
            if (avaliable.length != 0) {
                // if object is in range and automatic it will perform actions automatically
                let a = findAuto(avaliable)
                if (a) {
                    this.se.interact(a);
                } else {
                    // else object closest to player is marked as avaliable
                    avaliable.sort(this.sortFunc);
                    avaliable[0].avaliable = true;
                    // 
                    if (this.requestAction) this.se.interact(avaliable[0])
                }
            }
        } else {
            // do commands, order actions
            
            
        }
        this.player.checkCollision(this.curLevel.solids, this.curLevel.tilemapDim[0]);
        this.player.checkEntityCollision(this.interactable);
        this.player.update();
        
        this.dialogWin.update();
        
        this.requestAction = false;
    }

    render() {
        background("#000");

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
        this.tileMap.render(beginRenderX, beginRenderY, endRenderX, endRenderY);
        for (let inter of this.interactable) {
            inter.render();
        }
        this.player.render();
        ctx.restore();

        // display GUI
        this.dialogWin.render();
    }
}