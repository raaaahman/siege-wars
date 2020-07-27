import GameState from "./GameState"

class GameOverState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)
        let winner = this.scene.players.find(player => this.scene.battleMap.getPlayersUnits(player).length > 0)

        const headlinerColors = {
            blue: 0x5eabed,
            red: 0xc00c00
        }
        if (undefined !== winner) {
            this.headliner = this.scene.add.group([
                this.scene.add.rectangle(0, 60, 240, 40, headlinerColors[winner.color]).setOrigin(0),
                this.scene.add.text(70, 74, winner.color.toUpperCase() + ' Player Win!', {font: '14px monospace'}),
                this.scene.add.text(80, 104, 'Click to Quit', {font: '10px monospace'})
            ]).setDepth(99)
        } else {
            this.headliner = this.scene.add.group([
                this.scene.add.rectangle(0, 60, 240, 40, 0x2a2025).setOrigin(0),
                this.scene.add.text(70, 74, "It's a draw!", {font: '14px monospace'}),
                this.scene.add.text(80, 104, 'Click to Quit', {font: '10px monospace'})
            ])
        }
        this.cursor.setVisible(false)
    }

    pointerDown() {
        this.scene.game.scene.stop('GameScene')
        this.scene.game.scene.start('TitleScreen')
    }
}

export default GameOverState