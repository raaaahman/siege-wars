import GameState from "../objects/GameState"

class SelectState extends GameState {
    pointerMove(position) {
        if (!this.scene.battleMap.isOutOfBounds(position)) {
            let tile = this.scene.battleMap.getTileAt(position);
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

            this.scene.cursor.setPosition(tile.x * this.scene.tileWidth, tile.y * this.scene.tileHeight)

        }
    }

    pointerDown(position) {
        if (!this.battleMap.isOutOfBounds(position)) {
            let tile = this.battleMap.getTileAt(position)
            let hoveredUnit = tile.getUnit()

        }
    }
}

export default SelectState