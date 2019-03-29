class Entity {
    constructor (x, y) {
        this._pos = new Vector(x, y);
        this._anim = new AnimationManager();
        this.isDead = false;

        this._states = [];
        this.currentState = 0;
    }

    handleInput(ctrl) {
        
    }

    update() {

    }

    render(ctx) {
        this._anim.render(ctx, this._pos.x, this._pos.y);
    }
}