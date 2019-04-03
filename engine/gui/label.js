class Label {
    constructor(text, charSize, x, y, color = "#fff", align = "center") {
        this._charSize = charSize;
        this._pos = new Vector(x, y);
        
        this.color = color;
        this.text = text;
        this.align = align;
    }

    toggleBrackets() {
        if (this.text.startsWith("[")) {
            this.text = this.text.slice(1, -1);
        } else {
            this.text = `[${this.text}]`;
        }
    }

    render(ctx) {
        ctx.save();
        ctx.font = this._charSize + "px BBCMicrofont";
        ctx.textAlign = this.align;            
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this._pos.x, this._pos.y);
        ctx.restore();
    }
}
