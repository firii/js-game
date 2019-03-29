class MenuState extends GameState {
    constructor() {
        super();
        this.logo = new Sprite(Assets.getImage("logo"), 0, 0, 118, 52);
        this.verLabel = new Label("ver. 0.0.1", 20, 10, 465);

        this.playButton = new Button("НОВАЯ ИГРА", 170, 200);
        this.loadButton = new Button("СОХРАНЕНИЯ", 170, 260);
        this.editorButton = new Button("РЕДАКТОР УРОВНЕЙ", 170, 330);
    }

    handleInput(ctrl) {
        this.playButton.handleInput(ctrl);
        this.loadButton.handleInput(ctrl);
        this.editorButton.handleInput(ctrl);

        if (this.playButton.isPressed) {
            this.newState = "MAIN_GAME";
        }

        if (this.loadButton.isPressed) {
            this.newState = "LOAD";
        }

        if (this.editorButton.isPressed) {
            this.newState = "EDITOR";
        }
    }

    update() {
        this.playButton.update();
        this.loadButton.update();
        this.editorButton.update();
    }

    render(ctx) {
        background(ctx, "#e6f0f7");

        this.logo.render(ctx, 143, 20, 118 * 3, 52 * 3);

        this.verLabel.render(ctx);

        this.playButton.render(ctx);
        this.loadButton.render(ctx);
        this.editorButton.render(ctx);
    }
}