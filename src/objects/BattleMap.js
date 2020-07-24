import CSVParser from "../helpers/CSVParser";

class BattleMap {
    constructor(scene, tileWidth, tileHeight) {
        this.scene = scene
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
    }

    load(layers) {
        let terrain = CSVParser.fromString(layers.terrain);
        this.width  = terrain.maxColumns * this.tileWidth
        this.height = terrain.numRows * this.tileHeight
        this.terrain = terrain.map((value, position) => {
            let tile = this.scene.add.image(position.x * this.tileWidth, position.y * this.tileHeight, 'tileset', value)
            tile.setOrigin(0)
            return tile
        })
    }

    isOutOfBounds(position) {
        return position.x <= 0 ||
            position.x >= this.width ||
            position.y <= 0 ||
            position.y >= this.height
    }

    getTileAt(position) {
        let tileX = position.x - (position.x % this.tileWidth);
        let tileY = position.y - (position.y % this.tileHeight);
        return new Phaser.Math.Vector2(tileX, tileY);
    }
}

export default BattleMap