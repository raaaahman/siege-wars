import CSVParser from "../helpers/CSVParser";

class BattleMap {
    constructor(layers, scene) {
        let terrain = CSVParser.fromString(layers.terrain);
        this.width  = terrain.maxColumns * scene.tileWidth
        this.height = terrain.numRows * scene.tileHeight

        this.terrain = terrain.map((value, position) => {
            let tile = scene.add.image(position.x * scene.tileWidth, position.y * scene.tileHeight, 'tileset', value)
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
}

export default BattleMap