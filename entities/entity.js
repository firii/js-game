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

        this._dx = 0;
        this._dy = 0;

        this._facing = DIR.DOWN;
        this._state = ENTITY_STATES.IDLE;
    }

    handleInput(ctrl) {
        
    }

    update() {

    }

    render(ctx) {
        this._anim.render(ctx, this._pos.x, this._pos.y);
    }
}