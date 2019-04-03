class Asset {
    constructor(filepath) {
        this.isLoaded = false;

        // Placeholder for local testing,
        // will be removed upon releasing server version
        if (typeof filepath != "string") {
            this.resource = filepath;
            this.isLoaded = true;
            return;
        }

        filepath = "assets/" + filepath;
        if (filepath.endsWith("png")) {
            this.resource = new Image();

            this.resource.addEventListener("load", (function() {
                this.isLoaded = true;
            }).bind(this), {once: true});

            this.resource.src = filepath;

        } else if (filepath.endsWith("json")) {
            loadJSON((function(response) {
                this.resource = JSON.parse(response);
                this.isLoaded = true;
            }).bind(this), filepath);
        }

    }
}

class AssetManager {
    constructor() {
        console.log("start loading assets...");
        
        this._assets = {
            // Images
            "player": new Asset("images/player.png"),
            "dialog": new Asset("images/dialog_bg.png"),
            "test": new Asset("images/test.png"),
            "tileset1": new Asset("images/tileset.png"),
            "logo": new Asset("images/logo.png"),
            "bg_menu": new Asset("images/menu_bg.png"),

            // Json
            "level1": new Asset(level1),
            "anim_player": new Asset(anim_player)

        };

        let done = true;
        do {
            for (let i in this._assets) {
                done = done && this._assets[i].isLoaded;
            }
        } while (done);
        
        console.log("loading assets done!");
    }

    get(name) {
        return this._assets[name].resource;
    }
}


function loadJSON(callback, filepath) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", filepath, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
 }