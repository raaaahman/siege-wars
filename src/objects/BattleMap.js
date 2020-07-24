import CSVParser from "../helpers/CSVParser"
import Tile from "../objects/Tile"
import {UnitFactory} from "./Unit";
import unitTable from "../data/units.json";

class BattleMap {
    constructor(scene, tileWidth, tileHeight) {
        this.scene = scene
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
    }

    load(layers, players) {
        let terrain = CSVParser.fromString(layers.terrain);
        this.gridWidth  = terrain.maxColumns
        this.gridHeight = terrain.numRows
        this.terrain = terrain.map((value, position) => {
            let tile = new Tile(
                new Phaser.Math.Vector2(position.x, position.y),
                this.scene.add.image(position.x * this.tileWidth, position.y * this.tileHeight, 'tileset', value)
            )
            return tile
        })
        for (let num = 0; num < players.length; num++) {
            let units = new UnitFactory(unitTable, this.scene).forPlayer(players[num]).fromCSV(layers.units[num])
            units.forEach((unit) => this.placeUnit(unit))
        }
    }

    isOutOfBounds(position) {
        return position.x <= 0 ||
            position.x >= this.gridWidth * this.tileWidth ||
            position.y <= 0 ||
            position.y >= this.gridHeight * this.tileHeight
    }

    getTileAt(position) {
        let tileX = Math.floor(position.x / 16);
        let tileY = Math.floor(position.y / 16);
        return this.terrain[tileY * this.gridWidth + tileX];
    }

    placeUnit(unit) {
        this.terrain[unit.position.y * this.gridWidth + unit.position.x].setUnit(unit)
    }
}

export default BattleMap