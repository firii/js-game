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
            //Images
            // GUI
            "dialog": new Asset("images/dialog_bg.png"),
            "logo": new Asset("images/logo.png"),
            "bg_menu": new Asset("images/menu_bg.png"),
            // tileset
            "tileset1": new Asset("images/tileset.png"),
            // sprites
            "player": new Asset("images/ivanov.png"),
            "zinaida": new Asset("images/zinaida.png"),
            "note": new Asset("images/note.png"),
            "pythagoras": new Asset("images/pythagoras.png"),
            "chem_flask": new Asset("images/chem_flask.png"),
            "newton_cradle": new Asset("images/newton_cradle.png"),
            
            // Json
            // NPC
            "npc_zinaida": new Asset(npc_zinaida),
            "item_note": new Asset(item_note),
            "enemy_pythagoras": new Asset(enemy_pythagoras),
            "enemy_chem_flask": new Asset(enemy_chem_flask),
            "enemy_newton_cradle": new Asset(enemy_newton_cradle),
            // levels
            "level1": new Asset(level1),
            //animations
            "anim_note": new Asset(anim_note),
            "anim_player": new Asset(anim_player),
            "anim_zinaida": new Asset(anim_zinaida),
            "anim_pythagoras": new Asset(anim_pythagoras),
            "anim_chem_flask": new Asset(anim_chem_flask),
            "anim_newton_cradle": new Asset(anim_newton_cradle)

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