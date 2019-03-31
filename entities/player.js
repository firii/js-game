class Player extends Entity{
    constructor(x, y) {
        super(x, y);
        this._sprite = new Sprite(Assets.get("test"), 0, 0, 32, 32);

        // *****************************
        //     DONT FORGET TO REMOVE
        // AFTER TESTING WIHT INCOMPLETE
        //         SPRITE SHEET
        // *****************************
        this._state = ENTITY_STATES.WALK;

        this.setupAnim();
    }

    setupAnim() {
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

    handleInput(ctrl) {
        
    }

    update() {
        super.update();
    }
}