class ScriptEngine {
    constructor (gameObj) {
        this._g = gameObj;
        this.variables = {};
        this.inActionLoop = false;

        this._curInter = null

        this._curAction = null;
    }

    setInteractable(inter) {
        this._curInter = inter;
        this._curInter.automatic = false;
        this.inActionLoop = true;
    }

    nextAction() {
        let action = this.getAction(this._curInter);
        
        if (action != null) {
            this._curAction = action;
            this.run(action);
        } else {
            for (let act of this._curInter.actions) {
                if (act.default && act.complete) act.complete = false;
            }
        }
        
        return action;
    }

    completeCurrent(choice) {
        if (this._curAction.answers)
            this.execute(this._curAction.answerCommands[choice]);

        this.execute(this._curAction.commands);
        this._curAction.complete = true;
    }

    run(action) {
        if (action.text || action.answers) {
            let text = action.text.slice();
            let title = this._curInter.name
            if (text[0].startsWith("~")) {
                title = PLAYER_NAME;
                text[0] = action.text[0].slice(1);
            }
            this._g.dialogWin.showDialog(title, text, action.answers, action.time);
        }
    }

    execute(cmds) {
        if (!cmds) return;

        for (let cmd of cmds) {
            let args = cmd.split(" ");

            switch (args[0].toLowerCase()) {
                //set variable
                case "set":
                    this.variables[args[1]] = args[2] || 1;
                break;
                //delete variable
                case "del":
                    this.variables[args[1]] = undefined;
                break;
                //set current entity inactive
                case "vanish":
                    this._curInter.inactive = true;
                break;
            }
        }
    }

    getAction(inter) {
        let result = null;
        for (let act of inter.actions) {
            if (!act.complete && act.checkCondition(this.variables)) {
                result = act;
                break;
            }
        }
        return result;
    }


    get actionComplete() {
        if (this._curAction) return this._curAction.complete;
        return true;
    }
}