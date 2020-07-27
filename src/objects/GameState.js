class GameState {
    constructor(previousState, scene) {
        this.activePlayer = previousState.activePlayer
        this.scene = scene
        this.cursor = previousState.cursor
        this.scene.infoPanel.setVisible(false)
        this.scene.infoText.unitName.setText('')
        this.scene.infoText.unitPlayer.setText('')
        this.scene.infoText.unitHp.setText('')
        this.scene.infoText.unitDamage.setText('')
    }

    pointerMove() {

    }

    pointerDown() {
        
    }
}

export default GameState