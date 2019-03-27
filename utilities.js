const WIDTH = 640, HEIGHT = 480;

function background(ctx, l_color = "#000") {
    ctx.save();
    ctx.fillStyle = l_color;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
}