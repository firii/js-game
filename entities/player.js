class Player extends Entity{
    constructor(x, y) {
        super(x, y);
        this._sprite = new Sprite(Assets.getImage("test"), 0, 0, 32, 32);

        this._anim.create("down", this._sprite, 4, 0.15);
        this._sprite.next();
        this._anim.create("right", this._sprite, 4, 0.15);
        this._sprite.next();
        this._anim.create("up", this._sprite, 4, 0.15);
        this._sprite.next();
        this._anim.create("left", this._sprite, 4, 0.15);

        this._anim.setCurrent("down");
    }

    handleInput(ctrl) {
        if (ctrl.isKeyDown("KeyW"))
            this._anim.setCurrent("up");
            
        if (ctrl.isKeyDown("KeyD")) 
            this._anim.setCurrent("right");
            
        if (ctrl.isKeyDown("KeyS")) 
            this._anim.setCurrent("down");
            
        if (ctrl.isKeyDown("KeyA")) 
            this._anim.setCurrent("left");
            
    }
}