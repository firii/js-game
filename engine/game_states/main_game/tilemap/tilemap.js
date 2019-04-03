class TileMap {
    constructor(level) {
        this.width = level.tilemapDim[0];
        this.height = level.tilemapDim[1];

        this._rects = [];
        for (let i = 0; i < level.tilesetDim[1]; i++) {
            for (let j = 0; j < level.tilesetDim[0]; j++) {
                this._rects.push(new Rect(j * TILE_SIZE, i * TILE_SIZE,
                TILE_SIZE, TILE_SIZE));
            }
        }

        this._tileset = new Sprite(Assets.get(level.tileset), 0, 0, TILE_SIZE, TILE_SIZE);

        this._layers = level.layers;
    }

    render(ctx, brx, bry, erx, ery) {
        for (let l = 0; l < this._layers.length; l++) {

            for (let i = bry; i < ery; i++) {
                for (let j = brx; j < erx; j++) {
                    this._tileset.rect = this._rects[this._layers[l][i * this.width + j]];
                    this._tileset.render(ctx, j * TILE_SCALE, i * TILE_SCALE,
                        TILE_SCALE, TILE_SCALE);
                }
            }

        }
    }
}