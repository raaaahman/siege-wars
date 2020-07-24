import GameState from "./GameState"
import SelectState from "./SelectState"

class MoveState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)
        this.selectedUnit = previousState.selectedUnit
    }

    pointerDown(position) {
        if (!this.scene.battleMap.isOutOfBounds(position)) {
            let tile = this.scene.battleMap.getTileAt(position)
            let hoveredUnit = tile.getUnit()

            if (hoveredUnit === this.selectedUnit) {
                this.scene.state = new SelectState(this, this.scene)
            }

        }
    }
}

export default MoveState