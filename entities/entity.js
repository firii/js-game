const ENTITY_STATES = {
    IDLE: "IDLE",
    WALK: "WALK",
    HIT: "HIT"
}

const DIR = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT"
}

class Entity {
    constructor (x, y) {
        this._pos = new Vector(x, y);
        this._anim = new AnimationManager();
        this.isDead = false;
        this._animTime = 0;

        this.movSpeed = 5;

        this.dx = 0;
        this.dy = 0;

        this._facing = DIR.DOWN;
        this._state = ENTITY_STATES.IDLE;
    }

    handleInput(ctrl) {
        
    }

    update() {
        if (this._animTime > 0) {
            //for pop up animations 

            this._animTime--;
        } else {
            if (this.dx != 0 || this.dy != 0) {
                this._state = ENTITY_STATES.WALK;

                if (!this.dx && this.dy) {
                    this._facing = (this.dy > 0) ? DIR.DOWN : DIR.UP;
                } else {
                    this._facing = (this.dx > 0) ? DIR.RIGHT : DIR.LEFT;
                }

            } else {
                //this._state = ENTITY_STATES.IDLE;
            }
        }

        
        this._anim.setCurrent(this._state + "_" + this._facing);

        this._pos.add(this.dx, this.dy);

        this.dx = 0;
        this.dy = 0;
    }

    render(ctx) {
        this._anim.render(ctx, this._pos.x, this._pos.y);
    }
}