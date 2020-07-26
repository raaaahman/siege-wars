import GameState from "./GameState"
import SelectState from "./SelectState"
import SwitchTurnState from "./SwitchTurnState";

class AttackState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene);
        this.startPosition = previousState.startPosition

        this.potentialTargets = this.scene.battleMap.getNeighboringTiles(this.startPosition).filter(
            tile => tile.hasUnit() && tile.getUnit().player !== this.activePlayer
        )

        this.overlay = this.scene.battleMap.displayOverlay(this.potentialTargets, {tint: 0xff0000})
    }

    pointerDown(position) {
        let targettedTile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
        this.overlay.forEach(image => image.destroy())

        if (!this.potentialTargets.find(potentialTarget => potentialTarget === targettedTile)) {
            if (this.scene.battleMap.getPlayersUnits(this.activePlayer).reduce((canPlay, unit) => !unit.hasMoved || canPlay), false) {
                this.scene.state = new SelectState(new SwitchTurnState(this, this.scene), this.scene)
            } else {
                this.scene.state = new SelectState(this, this.scene)
            }
        }
    }

}

export default AttackState