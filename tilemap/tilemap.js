class TileMap {
    constructor(json) {
        this._width = json.width;
        this._height = json.height;

        this._rects = [];
        for (let i = 0; i < json.tilesetHeight; i++) {
            for (let j = 0; j < json.tilesetWidth; j++) {
                this._rects.push(new Rect(j * TILE_SIZE, i * TILE_SIZE,
                TILE_SIZE, TILE_SIZE));
            }
        }

        this._tileset = new Sprite(Assets.get(json.tileset), 0, 0, TILE_SIZE, TILE_SIZE);

        this._tiles = json.tiles;
        this._solid = json.solid;
    }

    render(ctx, offsetX, offsetY) {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                this._tileset.rect = this._rects[this._tiles[i * this._width + j]];
                this._tileset.render(ctx, j * TILE_SCALE + offsetX, i * TILE_SCALE + offsetY,
                    TILE_SCALE, TILE_SCALE);
            }
        }
    }
}