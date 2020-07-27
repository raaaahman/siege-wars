import GameState from "./GameState"
import SelectState from "./SelectState"

class SwitchTurnState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)

        this.scene.battleMap.getPlayersUnits(this.activePlayer).forEach(unit => unit.reset())
        this.activePlayer = this.scene.players[(this.scene.players.findIndex(player => player === this.activePlayer) + 1) % this.scene.players.length]

        const headlinerColors = {
            blue: 0x5eabed,
            red: 0xc00c00
        }
        this.headliner = this.scene.add.group([
            this.scene.add.rectangle(0, 60, 240, 40, headlinerColors[this.activePlayer.color]).setOrigin(0),
            this.scene.add.text(80, 74, this.activePlayer.color.toUpperCase() + ' Player', {font: '14px monospace'}),
            this.scene.add.text(80, 104, 'Click to Play', {font: '10px monospace'})
        ]).setDepth(99)
        this.cursor.setVisible(false)
    }

    pointerDown() {
        this.headliner.destroy(true)
        this.cursor.setVisible(true)
        this.scene.state = new SelectState(this, this.scene)
    }
}

export default SwitchTurnState