class UnitFactory {
    constructor(unitTable, scene) {
        this.unitTable = unitTable
        this.scene = scene
    }

    create (player, type, position) {
        if (this.unitTable.hasOwnProperty(type)) {
            let unit = new Unit(player, this.unitTable[type])
            let sprite = this.scene.add.sprite(position.x, position.y, 'tileset', unit.img)
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