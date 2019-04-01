class Player extends Living{
    constructor(level) {
        super(level.playerPos[0] * SCALE, level.playerPos[1] * SCALE, 32, 32);
        this._sprite = new Sprite(Assets.get("test"), 0, 0, 32, 32);

        // *****************************
        //     DONT FORGET TO REMOVE
        // AFTER TESTING WITH INCOMPLETE
        //         SPRITE SHEET
        // *****************************
        this._state = ENTITY_STATES.WALK;

        this._setupAnim();
    }

    _setupAnim() {
        let animSpeed = 0.1;
        this._anim.create("WALK_DOWN", this._sprite, 4, animSpeed);
        this._sprite.next();
        this._anim.create("WALK_RIGHT", this._sprite, 4, animSpeed);
        this._sprite.next();
        this._anim.create("WALK_UP", this._sprite, 4, animSpeed);
        this._sprite.next();
        this._anim.create("WALK_LEFT", this._sprite, 4, animSpeed);

        this._anim.setCurrent("WALK_DOWN");
    }

    update() {
        super.update();
    }

}