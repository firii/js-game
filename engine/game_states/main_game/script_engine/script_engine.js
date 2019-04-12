class ScriptEngine {
    constructor (gameObj) {
        this._g = gameObj;
        this.inActionLoop = false;

        this._curInter = null
    }

    interact(inter) {
        this._curInter = inter;
        this.inActionLoop = true;
    }
}