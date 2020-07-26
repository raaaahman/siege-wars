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

    pointerMove(position) {
        let targettedTile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
        this.cursor.setPosition(
            targettedTile.x * this.scene.battleMap.tileWidth,
            targettedTile.y * this.scene.battleMap.tileHeight,
        )

        if (this.potentialTargets.find(potentialTarget => potentialTarget === targettedTile)) {
            this.cursor.setFrame(173)
            this.scene.infoText.unitName.setText(targettedTile.getUnit().name)
            this.scene.infoText.unitPlayer.setText(targettedTile.getUnit().player.color)
            this.scene.infoText.unitDamage.setText('Dmg: ' + this.startPosition.getUnit().computeDamage(targettedTile.getUnit()) + ' %')
        } else {
            this.cursor.setFrame(207)
            this.scene.infoText.unitName.setText('')
            this.scene.infoText.unitPlayer.setText('')
            this.scene.infoText.unitDamage.setText('')
        }
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