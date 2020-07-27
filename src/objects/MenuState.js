import GameState from "./GameState"
import SelectState from "./SelectState"
import SwitchTurnState from "./SwitchTurnState";

class MenuState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)

        this.menuPanel = this.scene.add.group([
            this.scene.add.image(178, 94, 'menuPanel').setOrigin(0),
            this.scene.add.image(180, 98, 'buttonLarge', 0).setOrigin(0),
            this.scene.add.text(188, 102, 'End Turn', {font: '8px monospace'}),
            this.scene.add.image(180, 116, 'buttonLarge',0).setOrigin(0),
            this.scene.add.text(200, 120, 'Quit', {font: '8px monospace'})
        ]).setDepth(99)
    }

    pointerDown(position) {
        this.menuPanel.toggleVisible()

        if (position.x > 180 && position.x < 236 &&
        position.y > 98 && position.y < 116) {
            this.scene.state = new SwitchTurnState(this, this.scene)
        } else if (position.x > 180 && position.x < 236 &&
        position.y > 116 && position.y < 134) {
            this.scene.game.scene.stop('GameScene')
            this.scene.game.scene.start('TitleScreen')
        } else if (position.x < 178 || position.y < 94) {
            this.scene.state = new SelectState(this, this.scene)
        } else {
            this.menuPanel.toggleVisible()
        }

    }
}

export default MenuState