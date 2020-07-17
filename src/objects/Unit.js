import CSVParser from "../helpers/CSVParser";

class UnitFactory {
    constructor(unitTable, scene) {
        this.unitTable = unitTable
        this.scene = scene
        return this
    }

    forPlayer(player) {
        this.player = player
        return this
    }

    fromCSV(csv) {
        CSVParser.fromString(csv).map(this.create.bind(this))
    }

    create (unitType, position) {
        if (this.unitTable.hasOwnProperty(unitType)) {
            let unit = new Unit(this.player.color, this.unitTable[unitType])
            let sprite = this.scene.add.sprite(position.x * this.scene.gridWidth, position.y * this.scene.gridHeight, 'tileset', unit.img)
            sprite.setOrigin(0)
            return sprite
        }
    }
}

class Unit {
    constructor(player, stats) {
        this.name = stats.name
        this.img = stats.img[player]
    }
}

export {Unit, UnitFactory}