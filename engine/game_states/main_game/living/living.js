class Living {
    constructor (anim, x = 0, y = 0, w = TILE_SIZE, h = TILE_SIZE) {
        this.pos = new Vector(x, y);
        this._dim = new Vector(w, h);
        this._anim = anim && new AnimationManager(anim);
        this.isDead = false;
        this._animTime = 0;

        this.movSpeed = 1;

        this.dx = 0;
        this.dy = 0;

        this._state = ENTITY_STATES.IDLE
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
                this._state = ENTITY_STATES.IDLE;
            }
        }


        if (this._anim.hasAnimation(this._state + "_" + this._facing))
            this._anim.setCurrent(this._state + "_" + this._facing);

        
        this.pos.add(this.dx, this.dy);

        this.dx = 0;
        this.dy = 0;
    }


    render() {
        this._anim.render(this.x, this.y)
    }


    checkCollision(solids, w) {
        for (let i = Math.floor((this.y + this.dy)/TILE_SIZE);
        i < Math.ceil((this.y + this.height + this.dy)/TILE_SIZE); i++) {
            for (let j = Math.floor((this.x + this.dx)/TILE_SIZE);
            j < Math.ceil((this.x + this.width + this.dx)/TILE_SIZE); j++) {

                if (solids[i * w + j]) {                    
                    this.dx = 0;
                    this.dy = 0;
                }

            }
        }
    }


    checkEntityCollision(entities) {
        for (let e of entities) {
            if (e == this) continue;
            // rectangle collision detection
            if (!(e.x > this.x + this.width + this.dx || 
                  e.x + e.width < this.x + this.dx || 
                  e.y > this.y + this.height + this.dy ||
                  e.y + e.height < this.y + this.dy)) {
                      this.dx = 0;
                      this.dy = 0;
                  }
        }
    }


    get x() { return this.pos.x; }
    get y() { return this.pos.y; }
    get width() { return this._dim.x; }
    get height() { return this._dim.y; }
}
