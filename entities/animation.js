class Animation {
    constructor(sprite, frames, speed) {
        this._sprite = sprite;
        this._speed = speed;

        this._frames = [];
        for (let i = 0; i < frames; i++) {
            this._frames.push(new Rect(sprite.rect.width * i, sprite.rect.y,
                sprite.rect.width, sprite.rect.height));
        }

        this._currentFrame = 0;        
    }

    step() {
        this._currentFrame += this._speed;
        if (this._currentFrame > this._frames.length)
            this._currentFrame = 0;
    }

    render(ctx, x, y) {
        this._sprite.rect = this._frames[Math.floor(this._currentFrame)];
        this._sprite.render(ctx, x, y, this._sprite.rect.width * 3, this._sprite.rect.height * 3);
    }
}

class AnimationManager {
    constructor() {
        this._anims = {};
        this._paused = {}

        this._currentAnim = "";
    }

    create(name, sprite, frames, speed) {
        this._anims[name] = new Animation(sprite, frames, speed);
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