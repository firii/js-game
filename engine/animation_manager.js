class Animation {
    constructor(sprite, speed, frames) {
        this._sprite = sprite;
        this._speed = speed;

        this._frames = [];
        for (let frame of frames) {
            this._frames.push(new Rect(...frame));
        }

        this._currentFrame = 0;        
    }

    step() {
        this._currentFrame += this._speed;
        if (this._currentFrame > this._frames.length)
            this._currentFrame = 0;
    }

    reset() {
        this._currentFrame = 0;
    }

    render(ctx, x, y) {
        this._sprite.rect = this._frames[Math.floor(this._currentFrame)];
        this._sprite.render(ctx, x * SCALE, y * SCALE, this._sprite.rect.width * SCALE, this._sprite.rect.height * SCALE);
    }
}

class AnimationManager {
    constructor(json) {
        this._anims = {};
        this._paused = {};
        this._currentAnim = "";
        this._sprite = new Sprite(Assets.get(json.sprite));

        for (let a in json) {
            if (a == "sprite") continue;
            this.create(a, this._sprite, json[a].speed, json[a].frames);
        }
    }

    create(name, sprite, speed, frames) {
        this._anims[name] = new Animation(sprite, speed, frames);
        this._paused[name] = false;
    }

    render(ctx, x, y) {
        this._anims[this._currentAnim].render(ctx, x, y);
        if (!this._paused[this._currentAnim])
            this._anims[this._currentAnim].step();
    }

    pause(name) {
        this._paused[name] = true;
    }
    
    resume(name) {
        this._paused[name] = false;
    }

    setCurrent(name) {
        this._currentAnim = name;
    }

}