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
            let unitStats    = this.unitTable[unitType];
            let unitSprite   = this.scene.add.sprite(position.x * this.scene.tileWidth, position.y * this.scene.tileHeight, 'tileset', unitStats.img[this.player.color])
            unitSprite.setOrigin(0)
            unitSprite.setDepth(20)
            return new Unit(this.player, position, unitStats, unitSprite)
        }
    }
}

class Unit {
    constructor(player, position, stats, sprite) {
        this.player   = player
        this.position = new Phaser.Math.Vector2(position.x, position.y)
        this.name     = stats.name
        this.hp       = 10
        this.move     = stats.move
        this.damage   = stats.damage
        this.sprite   = sprite
        this.hasMoved = false
    }

    reset() {
        this.hasMoved = false
        this.sprite.clearTint()
    }

    computeDamage(unit) {
        return this.damage[unit.name] * this.hp / 10
    }
}

export {Unit, UnitFactory}