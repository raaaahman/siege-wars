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

            /*
            let guiDimensions = {
                x: 176,
                y: 0,
                width: 48,
                height: 160
            }
            */

            if (hoveredUnit) {
                this.scene.infoText.unitName.setText(hoveredUnit.name)
                this.scene.infoText.unitPlayer.setText(hoveredUnit.player.color)
            } else {
                this.scene.infoText.unitName.setText('')
                this.scene.infoText.unitPlayer.setText('')
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