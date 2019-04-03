class MenuState extends GameState {
    constructor() {
        super();
        this.background = new Sprite(Assets.get("bg_menu"), 0, 0, 214, 160);
        this.logo = new Sprite(Assets.get("logo"), 0, 0, 118, 52);
        this.verLabel = new Label("ver. 0.0.1", 20, 10, 465, "#fff", "left");
        
        this.gui = new OptionWindow();
        this.gui.setOptions(
            new Label("НОВАЯ ИГРА", 30, WIN_WIDTH/2, 220),
            new Label("СОХРАНЕНИЯ", 30, WIN_WIDTH/2, 250),
            new Label("РЕДАКТОР", 30, WIN_WIDTH/2, 290)
        );
        this.gui.isVisible = true;
        
    }

    handleInput() {
        this.gui.handleInput();

        switch (this.gui.getChoice()) {
            case 0: this.newState = "MAIN_GAME"; break;
            case 1: this.newState = "SAVES"; break;
            case 2: this.newState = "EDITOR"; break;
        }
    }

    update() {
        this.gui.update();
    }

    render(ctx) {
        this.background.render(ctx, 0, 0, WIN_WIDTH, WIN_HEIGHT);

        this.logo.render(ctx, 143, 20, 118 * 3, 52 * 3);

        this.gui.render(ctx);

        this.verLabel.render(ctx);
    }
}