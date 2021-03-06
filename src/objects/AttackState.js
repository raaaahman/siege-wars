import GameState from "./GameState"
import SelectState from "./SelectState"
import SwitchTurnState from "./SwitchTurnState"
import GameOverState from "./GameOverState"

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
            this.scene.infoPanel.setVisible(true)
            this.scene.infoText.unitName.setText(targettedTile.getUnit().name)
            this.scene.infoText.unitPlayer.setText(targettedTile.getUnit().player.color)
            this.scene.infoText.unitHp.setText('Hp: ' + targettedTile.getUnit().hp)
            this.scene.infoText.unitDamage.setText('Dmg: ' + this.startPosition.getUnit().computeDamageRate(targettedTile.getUnit()) + '%')

            if (position.y < this.scene.game.config.height / 2 && position.x > 176) {
                this.scene.infoPanel.setY(this.scene.game.config.height / 2 + 2)
                this.scene.infoText.unitName.setY(this.scene.game.config.height / 2 + 6)
                this.scene.infoText.unitPlayer.setY(this.scene.game.config.height / 2 + 18)
                this.scene.infoText.unitHp.setY( this.scene.game.config.height / 2 + 30)
                this.scene.infoText.unitDamage.setY( this.scene.game.config.height / 2 + 42)
            } else {
                this.scene.infoPanel.setY(2)
                this.scene.infoText.unitName.setY(6)
                this.scene.infoText.unitPlayer.setY(18)
                this.scene.infoText.unitHp.setY(30)
                this.scene.infoText.unitDamage.setY(42)
            }
        } else {
            this.cursor.setFrame(207)
            this.scene.infoPanel.setVisible(false)
            this.scene.infoText.unitName.setText('')
            this.scene.infoText.unitPlayer.setText('')
            this.scene.infoText.unitHp.setText('')
            this.scene.infoText.unitDamage.setText('')
        }
    }

    pointerDown(position) {
        let targettedTile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
        this.overlay.forEach(image => image.destroy())

        if (this.potentialTargets.find(potentialTarget => potentialTarget === targettedTile)) {
            let attacker = this.startPosition.getUnit();
            let defender = targettedTile.getUnit();
            attacker.attack(defender)
            if (defender.hp <= 0) {
                targettedTile.setUnit(null)
            } else {
                defender.attack(attacker)
                if (attacker.hp <= 0) {
                    this.startPosition.setUnit(null)
                }
            }
        }

        if (this.scene.players.filter((player) => this.scene.battleMap.getPlayersUnits(player).length > 0).length <= 1) {
            this.scene.state = new GameOverState(this, this.scene)
        } else if (this.scene.battleMap.getPlayersUnits(this.activePlayer).reduce((canPlay, unit) => !unit.hasMoved || canPlay, false)) {
            this.scene.state = new SelectState(this, this.scene)
        } else {
            this.scene.state = new SwitchTurnState(this, this.scene)
        }
    }

}

export default AttackState