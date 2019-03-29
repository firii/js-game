class Asset {
    constructor(location) {
        this.resource = new Image();
        this.isLoaded = false;
        this.resource.addEventListener("load", (function(e) {
            this.isLoaded = true;
        }).bind(this), {once: true});
        this.resource.src = location;
    }
}

class AssetManager {
    constructor() {
        console.log("start loading assets...");
        
        this._images = {
            "player": new Asset("img/player.png"),
            "gui": new Asset("img/gui.png"),
            "test": new Asset("img/test.png"),
            "logo": new Asset("img/logo.png")
        };

        let done = true;
        do {
            for (let i in this._images) {
                done = done && this._images[i].isLoaded;
            }
        } while (done);
        
        console.log("loading assets done!");
    }

    getImage(name) {
        return this._images[name].resource;
    }
}