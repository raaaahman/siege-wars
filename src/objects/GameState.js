class GameState {
    constructor(previousState, scene) {
        this.activePlayer = previousState.activePlayer
        this.scene = scene
    }
}

export default GameState