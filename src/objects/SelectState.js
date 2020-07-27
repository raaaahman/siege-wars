import GameState from "../objects/GameState"
import MoveState from "../objects/MoveState"
import MenuState from "../objects/MenuState"

class SelectState extends GameState {

    constructor(previousState, scene) {
        super(previousState, scene);

        const cursorImages = { red: 297, blue: 298, green: 299, yellow: 300};
        this.cursor.setFrame(cursorImages[this.activePlayer.color])
    }
    pointerMove(position) {
        if (!this.scene.battleMap.isOutOfBounds(position)) {
            let tile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position));
            let hoveredUnit = tile.getUnit();

            if (hoveredUnit) {
                this.scene.infoPanel.setVisible(true)
                this.scene.infoText.unitName.setText(hoveredUnit.name)
                this.scene.infoText.unitPlayer.setText(hoveredUnit.player.color)
                this.scene.infoText.unitHp.setText('Hp: ' + hoveredUnit.hp)

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
                this.scene.infoPanel.setVisible(false)
                this.scene.infoText.unitName.setText('')
                this.scene.infoText.unitPlayer.setText('')
                this.scene.infoText.unitHp.setText('')
            }

            this.cursor.setPosition(tile.x * this.scene.tileWidth, tile.y * this.scene.tileHeight)

        }
    }

    pointerDown(position) {
        if (!this.scene.battleMap.isOutOfBounds(position)) {
            let tile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
            let hoveredUnit = tile.getUnit()

            if (hoveredUnit && hoveredUnit.player === this.activePlayer && false === hoveredUnit.hasMoved) {
                this.scene.state = new MoveState(Object.assign(this, {startPosition: tile, selectedUnit: hoveredUnit}), this.scene)
            } else {
                this.scene.state = new MenuState(this, this.scene)
            }
        }
    }
}

export default SelectState