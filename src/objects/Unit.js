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
        return CSVParser.fromString(csv).map(this.create.bind(this)).filter(unit => unit !== undefined)
    }

    create (unitType, position) {
        if (this.unitTable.hasOwnProperty(unitType)) {
            let unitStats = this.unitTable[unitType];
            let unitSprite = this.scene.add.sprite(position.x * this.scene.tileWidth, position.y * this.scene.tileHeight, 'tileset', unitStats.img[this.player.color])
            unitSprite.setOrigin(0)
            return new Unit(this.player, unitStats, unitSprite)
        }
    }
}

class Unit {
    constructor(player, stats, sprite) {
        this.player = player
        this.name = stats.name
        this.sprite = sprite
    }
}

export {Unit, UnitFactory}