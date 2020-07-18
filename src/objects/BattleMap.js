import CSVParser from "../helpers/CSVParser";

class BattleMap {
    constructor(layers, scene) {
        this.terrain = CSVParser.fromString(layers.terrain).map((value, position) => {
            let tile = scene.add.image(position.x * scene.gridWidth, position.y * scene.gridHeight, 'tileset', value)
            tile.setOrigin(0)
            return tile
        })
    }
}

export default BattleMap