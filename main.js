window.addEventListener("load", function() {
    
    // Creating Game object, rednering and updating 60 times pes second

    // Setting up the canvas context to draw on
    let canvas = document.getElementById("game-canvas");
    window.ctx = canvas.getContext("2d");

    window.ctx.imageSmoothingEnabled = false;

    window.Assets = new AssetManager();
    window.ctrl = new Controller();
    let game = new Game();

    function main() {
        if (!game.done) {
            
            game.handleInput();
            game.update();
            game.render();
            ctrl.update();

            requestAnimationFrame(main);
        }
    }

    main();
});
