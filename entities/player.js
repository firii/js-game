class Player extends Entity{
    constructor(x, y) {
        super(x, y);
        this._sprite = new Sprite(Assets.getImage("test"), 0, 0, 32, 32);

        // *****************************
        //     DONT FORGET TO REMOVE
        // AFTER TESTING WIHT INCOMPLETE
        //         SPRITE SHEET
        // *****************************
        this._state = ENTITY_STATES.WALK;

        this.setupAnim();
    }

    setupAnim() {
        this._anim.create("WALK_DOWN", this._sprite, 4, 0.15);
        this._sprite.next();
        this._anim.create("WALK_RIGHT", this._sprite, 4, 0.15);
        this._sprite.next();
        this._anim.create("WALK_UP", this._sprite, 4, 0.15);
        this._sprite.next();
        this._anim.create("WALK_LEFT", this._sprite, 4, 0.15);

        this._anim.setCurrent("WALK_DOWN");
    }

    handleInput(ctrl) {
        if (ctrl.isKeyPressed("KeyW")) {
            this._dy = -1;
            this._facing = DIR.UP;
            this._state = ENTITY_STATES.WALK;
        }
        
        if (ctrl.isKeyPressed("KeyS")) {
            this._dy = 1;
            this._facing = DIR.DOWN;
            this._state = ENTITY_STATES.WALK;
        }
            
        if (ctrl.isKeyPressed("KeyD")) {
            this._dx = 1;
            this._facing = DIR.RIGHT;
            this._state = ENTITY_STATES.WALK;
        }
            
        if (ctrl.isKeyPressed("KeyA")) {
            this._dx = -1;
            this._facing = DIR.LEFT;
            this._state = ENTITY_STATES.WALK;
        }
            
    }

    update() {
        this._anim.setCurrent(this._state + "_" + this._facing);
        this._pos.add(this._dx * 5, this._dy * 5);

        if (this._animTime > 0) {
            //do something

            this._animTime--;
        } else {
           //this._state = ENTITY_STATES.IDLE;
        }
        this._dx = 0;
        this._dy = 0;
    }
}