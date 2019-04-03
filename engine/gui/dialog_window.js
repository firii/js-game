class OptionWindow {
    constructor() {
        this._options = [];
        this._nOptions = 0;
        this._curOption = 0;
        this._done = false;
        this._glowTime = -1;
        this._maxGlowTime = 30;

        this.isVisible = false;
    }

    /**
     * @param  {...Label} options 
     */
    setOptions(...options) {
        this._options = options;
        this._nOptions = options.length;
        this._options[0].toggleBrackets();
    }

    _cycleOption() {
        if (this._curOption == this._nOptions - 1) {
            this._curOption = 0;
        } else {
            this._curOption++;
        }
    }

    getChoice() {
        if (this._done) return this._curOption;
        return false;
    }

    handleInput() {
        if (this._glowTime <= 0 && this.isVisible) {
            if (ctrl.isKeyDown("Enter")) {
                this._glowTime = this._maxGlowTime;
            } else if (ctrl.isKeyDown("Space")) {                 
                this._options[this._curOption].toggleBrackets();
                this._cycleOption();
                this._options[this._curOption].toggleBrackets();
            }
        }
    }

    update() {
        if (this.isVisible) {
            if (this._glowTime > 0) {
                this._glowTime--; 
            } else if (this._glowTime == 0) {
                this._glowTime--;
                this._done = true;
            }
        }
    }

    render(ctx) {
        if (this.isVisible) {            
            for (let option in this._options) {
                if (option == this._curOption && this._glowTime % 10 > 5) continue;
                    this._options[option].render(ctx);
            }
        }
    }

}

class DialogWindow extends OptionWindow{
    constructor(x, y, bgSprite) {
        super();
        this._pos = new Vector(x, y);
        this._sprite = bgSprite;

        /**
         * @todo make relative to WIN_WIDTH, WIN_HEIGHT
         */
        this._titleLabel = new Label("", 24, x + 10, y + 25, "#fff", "left");
        this._textLabel = new Label("", 20, x + 10, y + 50, "#99aebd", "left");
        this._skipLabel = new Label("[ПРОБЕЛ]", 20, WIN_WIDTH / 2, 460, "#99aebd");
        this._timerLabel = new Label("", 24, 630, y + 25, "#fff", "right");

        this.setOptions(
            new Label("", 20, 160, 455),
            new Label("", 20, 460, 455),
            new Label("", 20, 160, 470),
            new Label("", 20, 460, 470)
        );
        
        this._timer = -1;
    }

    _reset() {
        this._nOptions = 0;
        this._curOption = 0;
        this._done = false;
        this._glowTime = -1;
        this._timer = -1;
    }

    _cycleOption() {
        if (this._curOption == this._nOptions - 1) {
            this._curOption = 0;
        } else {
            this._curOption++;
        }
    }

    showDialog(title, text, answers, time) {
        this._reset();
        this._titleLabel.text = title;
        this._textLabel.text = text;
        
        if (answers) {
            if (time) this._timer = time;
            for (let ind in answers) {
                
                let color = "#99aebd";
                let text = answers[ind];
                switch (text[0]) {
                    // color prefixes for dialog options
                    case "!": color = "#bb9d3b"; text = text.substring(1); break;
                    case "*": color = "#bb443b"; text = text.substring(1); break;
                }
    
                this._options[ind].color = color;
                this._options[ind].text = text;
            }

            this._options[0].toggleBrackets();
            this._nOptions = answers.length;
        }        

        this.isVisible = true;
    }

    getAnswer() {
        if (this._done) {
            if (this._nOptions) return this._curOption;
            return true;
        } else {
            return false;
        }
    }

    isTimeUp() {
        return this._timer == 0;
    }

    handleInput() {
        if (this._glowTime <= 0 && this.isVisible) {
            if (ctrl.isKeyDown("Enter")) {
                this._glowTime = this._maxGlowTime;
            } else if (ctrl.isKeyDown("Space")) {
                if (this._nOptions) {                    
                    this._options[this._curOption].toggleBrackets();
                    this._cycleOption();
                    this._options[this._curOption].toggleBrackets();
                } else {
                    this._glowTime = this._maxGlowTime / 2;
                }
            }
        }
    }

    update() {
        super.update();
        if (this.isVisible) {

            if (this._timer > 0)  {
                this._timer--;

                let f = this._timer % 60;
                if (f < 10) f = "0" + f;
                this._timerLabel.text = `[${Math.floor(this._timer / 60)}:${f}]`;
            }
        }
    }

    render(ctx) {
        if (this.isVisible) {
            this._sprite.render(ctx, this._pos.x, this._pos.y);
            this._titleLabel.render(ctx);
            this._textLabel.render(ctx);
            this._timerLabel.render(ctx);
            
            if (this._nOptions != 0) {
                for (let option in this._options) {
                    if (option == this._curOption && this._glowTime % 10 > 5) continue;
                        this._options[option].render(ctx);
                }
            } else {
                if (this._glowTime % 10 < 5)
                    this._skipLabel.render(ctx);
            }
        }
    }
}

