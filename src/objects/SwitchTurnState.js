import GameState from "./GameState"
import SelectState from "./SelectState"

class SwitchTurnState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)

        this.scene.battleMap.getPlayersUnits(this.activePlayer).forEach(unit => unit.reset())
        this.activePlayer = this.scene.players[(this.scene.players.findIndex(player => player === this.activePlayer) + 1) % this.scene.players.length]
    }
}

export default SwitchTurnState