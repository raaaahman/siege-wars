class GameState {
    constructor(previousState, scene) {
        this.activePlayer = previousState.activePlayer
        this.scene = scene
        this.cursor = previousState.cursor
    }

    pointerMove() {

    }

    pointerDown() {
        
    }
}

export default GameState