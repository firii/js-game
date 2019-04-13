class Action {
    constructor(data) {
        this.condition = data.condition || "";
        this.text = [];
        if (data.text) this.text = data.text.split("\n");

        this.commands = data.commands || [];
        this.default = data.default;

        if (data.answers) {
            this.answers = [];
            this.answerCommands = [];

            for (let i of data.answers) {
                this.answers.push(i[0]);
                this.answerCommands.push(i.slice(1));
            }

            this.time = data.time || -1;
            this.timeUpCommands = data.timeUpCommands || [];
        }

        this.complete = false;
    }

    checkCondition(vars) {
        if (!this.condition) return true;

        let args = this.condition.split(" ");
        if (args[0].startsWith("!")) {
            let varName = args[0].slice(1);
            if (args.length == 2) return vars[varName] != args[1];
            if (args.length == 1) return vars[varName] === undefined;
        } else {
            if (args.length == 2) return vars[args[0]] == args[1];
            if (args.length == 1) return vars[args[0]] !== undefined;
        }
        
    }
}