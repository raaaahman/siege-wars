import CSVParser from "../helpers/CSVParser";

class BattleMap {
    constructor(layers, scene) {
        let terrain = CSVParser.fromString(layers.terrain);
        this.width  = terrain.numRows * scene.tileWidth
        this.height = terrain.maxColumns * scene.tileHeight

        this.terrain = terrain.map((value, position) => {
            let tile = scene.add.image(position.x * scene.tileWidth, position.y * scene.tileHeight, 'tileset', value)
            tile.setOrigin(0)
            return tile
        })
    }
}

export default BattleMap