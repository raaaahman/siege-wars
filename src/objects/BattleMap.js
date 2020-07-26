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
            units.forEach(unit => {
                if (num % 2 !== 0) {
                    unit.sprite.setFlipX(true)
                }
                this.placeUnit(unit)
            })
        }
    }

    isOutOfBounds(position) {
        return position.x <= 0 ||
            position.x >= this.gridWidth * this.tileWidth ||
            position.y <= 0 ||
            position.y >= this.gridHeight * this.tileHeight
    }

    getTileAt(coordinates) {
        return this.terrain[coordinates.y * this.gridWidth + coordinates.x];
    }

    computeCoordinates(position) {
        let tileX = Math.floor(position.x / 16);
        let tileY = Math.floor(position.y / 16);
        return new Phaser.Math.Vector2(tileX, tileY);
    }

    getNeighboringTiles(tile) {
        return [
            new Phaser.Math.Vector2().copy(tile.position).add(Phaser.Math.Vector2.DOWN),
            new Phaser.Math.Vector2().copy(tile.position).add(Phaser.Math.Vector2.UP),
            new Phaser.Math.Vector2().copy(tile.position).add(Phaser.Math.Vector2.RIGHT),
            new Phaser.Math.Vector2().copy(tile.position).add(Phaser.Math.Vector2.LEFT)
        ].filter(coordinates => {
            return coordinates.x >= 0 && coordinates.x < this.gridWidth &&
            coordinates.y >= 0 && coordinates.y < this.gridHeight
        }).map(coordinates => this.terrain[coordinates.y * this.gridWidth + coordinates.x])
    }

    placeUnit(unit) {
        this.terrain[unit.position.y * this.gridWidth + unit.position.x].setUnit(unit)
    }

    getPlayersUnits(player) {
        let units = []
        this.terrain.forEach(tile => {
            if (tile.hasUnit() && tile.getUnit().player === player) {
                units.push(tile.getUnit())
            }
        })
        return units
    }
}

export default BattleMap