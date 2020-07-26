import {Unit} from "./Unit";

class Tile {
    constructor(position, image) {
        this.position = position
        this.unit     = null;
        this.image    = image
        this.image.setOrigin(0)
    }

    get x() {
        return this.position.x
    }

    get y() {
        return this.position.y
    }

    setUnit(unit) {
        this.unit = unit
    }

    getUnit() {
        return this.unit
    }

    hasUnit() {
        return this.unit instanceof Unit
    }

}

export default Tile
