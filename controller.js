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
        this._keyboard = {
            "Escape": new KeyInput()
        };

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
        let key = event.key;

        if (this._keyboard.hasOwnProperty(key)) {        
            this._keyboard[key].down = true;
            this._keyboard[key].active = true;
        }
    }

    _handleKeyUp(event) {
        let key = event.key;

        if (this._keyboard.hasOwnProperty(key)) {
            this._keyboard[key].down = false;
            this._keyboard[key].active = false;
        }
    }

    // this part is written horribly unefficient
    //TODO: improve efficiency, and possible performance issues
    _handleMouseDown(event) {
        let button;
        if (event.button == 0) 
            button = "LButton";
        else if (event.button == 2)
            button = "RButton";
        else
            return;

        this._mouse[button].down = true;
        this._mouse[button].active = true;
    }

    _handleMouseUp(event) {
        let button;
        if (event.button == 0) 
            button = "LButton";
        else if (event.button == 2)
            button = "RButton";
        else
            return;

        this._mouse[button].down = false;
        this._mouse[button].active = false;
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