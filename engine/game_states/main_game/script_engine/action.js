class Action {
    constructor(data) {
        this.condition = data.condition || "";
        this.text = data.text || [];
        this.commands = data.commands || [];

        if (data.answers) {
            this.answers = data.answers;
            this.time = data.time || -1;
            this.timeUpCommands = data.timeUpCommands || [];
        }

        this.complete = false;
    }


}