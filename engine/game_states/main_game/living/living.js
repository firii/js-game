class Living {
    constructor (anim, x, y, w = TILE_SIZE, h = TILE_SIZE) {
        this._pos = new Vector(x, y);
        this._dim = new Vector(w, h);
        this._anim = new AnimationManager(anim);
        this.isDead = false;
        this._animTime = 0;

        this.movSpeed = 2;

        this.dx = 0;
        this.dy = 0;

        this._facing = DIR.DOWN;
        this._state = ENTITY_STATES.IDLE;
    }

    handleInput() {
        
    }

    update() {
        if (this._animTime > 0) {
            //for lasting animations 

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

    checkCollision(solids, w) {
        for (let i = Math.floor((this._pos.y + this.dy)/TILE_SIZE);
        i < Math.ceil((this._pos.y + this._dim.y + this.dy)/TILE_SIZE); i++) {
            for (let j = Math.floor((this._pos.x + this.dx)/TILE_SIZE);
            j < Math.ceil((this._pos.x + this._dim.x + this.dx)/TILE_SIZE); j++) {

                if (solids[i * w + j]) {                    
                    this.dx = 0;
                    this.dy = 0;
                }

            }
        }
    }

    get x() { return this._pos.x; }
    get y() { return this._pos.y; }
    get width() { return this._dim.x; }
    get height() { return this._dim.y; }
}

// for (let i = Math.floor((this._pos.y + this.dy)/TILE_SIZE);
//         i < Math.floor((this._pos.y + this._dim.y  + this.dy)/TILE_SIZE); i++) {
//             for (let j = Math.floor((this._pos.x + this.dy)/TILE_SIZE);
//             j < Math.floor((this._pos.x + this._dim.x  + this.dy)/TILE_SIZE); j++) {