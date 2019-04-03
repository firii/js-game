class Player extends Living{
    constructor(level) {
        super(Assets.get("anim_player"), ...level.playerPos, 32, 32);

        // *****************************
        //     DONT FORGET TO REMOVE
        // AFTER TESTING WITH INCOMPLETE
        //         SPRITE SHEET
        // *****************************
        this._state = ENTITY_STATES.WALK;
        this._anim.setCurrent("WALK_DOWN");

        // let rects = "";
        // for (let a in this._anim._anims) {
        //     for (let i = 0; i < 4; i++)
        //         rects += JSON.stringify(this._anim._anims[a]._frames[i].bounds) + ", ";
        //     rects += "\n";
        // }
        // console.log(rects);
        

    }

    handleInput() {
        if (ctrl.isKeyPressed("KeyW"))
            this.dy = -this.movSpeed;
        
        if (ctrl.isKeyPressed("KeyS"))
            this.dy = this.movSpeed;
            
        if (ctrl.isKeyPressed("KeyD"))
            this.dx = this.movSpeed;
            
        if (ctrl.isKeyPressed("KeyA"))
            this.dx = -this.movSpeed;
   
        if (this.dx && this.dy) this.dy = 0;
    }

    update() {
        super.update();
    }

    render(ctx) {
        this._anim.render(ctx, this._pos.x, this._pos.y);
    }

}