class KeyInput {
    constructor() {
        this.down = false;
        this.active = false;
    }
}


class MouseInput {
    constructor() {
        this.LButton = new KeyInput();
        this.RButton = new KeyInput();
        
        this.x = this.y = 0;
    }
}


class Controller {
    constructor() {
        this._keyboard = {};

        let keyList = [
            "Escape",
            "Enter",
            "keyW",
            "keyA",
            "keyS",
            "keyD"
        ]

        for (let key of keyList) {
            this._keyboard[key] = new KeyInput();
        }

        this._mouse = new MouseInput();
        

        window.addEventListener("keydown",
            this._handleKeyDown.bind(this));
        window.addEventListener("keyup",
            this._handleKeyUp.bind(this));

        window.addEventListener("mousedown",
            this._handleMouseDown.bind(this));
        window.addEventListener("mouseup",
            this._handleMouseUp.bind(this));
        window.addEventListener("mousemove",
            this._handleMouseMove.bind(this));
    }

    update() {
        for (let key in this._keyboard) {
            if (this._keyboard[key].down &&
                this._keyboard[key].active) {
                    this._keyboard[key].down = false;
                }
        }
        for (let button of ["RButton", "LButton"]) {
            if (this._mouse[button].down &&
                this._mouse[button].active) {
                    this._mouse[button].down = false;
                }
        }
        
    }

    _handleKeyDown(event) {
        if (this._keyboard.hasOwnProperty(event.code)) {        
            this._keyboard[event.code].down = true;
            this._keyboard[event.code].active = true;
        }
    }

    _handleKeyUp(event) {
        if (this._keyboard.hasOwnProperty(event.code)) {
            this._keyboard[event.code].down = false;
            this._keyboard[event.code].active = false;
        }
    }

    _handleMouseDown(event) {
        if (event.button == 0) {
            this._mouse.LButton.down = true;
            this._mouse.LButton.active = true;
        }
        else if (event.button == 2) {
            this._mouse.RButton.down = true;
            this._mouse.RButton.active = true;
        }
    }

    _handleMouseUp(event) {
        if (event.button == 0) {
            this._mouse.LButton.down = false;
            this._mouse.LButton.active = false;
        }
        else if (event.button == 2) {
            this._mouse.RButton.down = false;
            this._mouse.RButton.active = false;
        }
    }

    _handleMouseMove(event) {
        this._mouse.x = event.clientX;
        this._mouse.y = event.clientY;
    }

    isKeyDown(code) {
        return this._keyboard[code].down;
    }

    isKeyPressed(code) {
        return this._keyboard[code].active;
    }

    isMouseDown(button = "LButton") {
        return this._mouse[button].down;
    }

    isMousePressed(button = "LButton") {
        return this._mouse[button].active;
    }

    getMouseX() {
        return this._mouse.x;
    }
    
    getMouseY() {
        return this._mouse.y;
    }
}
