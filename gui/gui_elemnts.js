class Label {
    constructor(text, charSize, x, y, color = "#000") {
        this._text = text;
        this._charSize = charSize;
        this._color = color;
        this._pos = new Vector(x, y);

        this.isCentered = false;
    }

    render(ctx) {
        ctx.save();
        ctx.font = this._charSize + "px C64";
        if (this.isCentered)
            ctx.textAlign = "center";            
        ctx.fillStyle = this._color;
        ctx.fillText(this._text, this._pos.x, this._pos.y);
        ctx.restore();
    }
}

class Button {
    constructor(text, x, y) {
        this._sprite = new Sprite(Assets.getImage("gui"), 0, 0, 100, 15);
        this._pos = new Vector(x, y);
        this._label = new Label(text, 35, x + 150, y + 30, "#0c1551");
        this._label.isCentered = true;
        this.isPressed = false;
    }

    handleInput(ctrl) {
        let mx = ctrl.getMouseX(), my = ctrl.getMouseY();

        if (mx > this._pos.x && mx < this._pos.x + 300 &&
            my > this._pos.y && my < this._pos.y + 45)
        {
            if (ctrl.isMouseDown()) {
                this.isPressed = true;
            }
        }
    }

    update() {
        this.isPressed = false;
    }

    render(ctx) {
        this._sprite.render(ctx, this._pos.x, this._pos.y, 300, 45);
        this._label.render(ctx);
    }
}

