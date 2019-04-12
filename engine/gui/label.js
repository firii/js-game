class Label {
    constructor(text, charSize, x = 0, y = 0, color = "#fff", align = "center") {
        this._charSize = charSize;
        this.pos = new Vector(x, y);
        
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

    render() {
        ctx.save();
        ctx.font = this._charSize + "px BBCMicrofont";
        ctx.textAlign = this.align;            
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.pos.x, this.pos.y);
        ctx.restore();
    }
}
