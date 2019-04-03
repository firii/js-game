window.addEventListener("load", function(l_event) {
    
    // Creating Game object, rednering and updating 60 times pes second

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
