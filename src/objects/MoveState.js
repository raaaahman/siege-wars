import GameState from "./GameState"
import SelectState from "./SelectState"
import SwitchTurnState from "./SwitchTurnState"
import AttackState from "./AttackState";

class MoveState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)
        this.selectedUnit = previousState.selectedUnit
        this.startPosition = previousState.startPosition
        this.selectionHalo = this.cursor

        this.cursor = this.scene.add.image(this.cursor.x, this.cursor.y, 'tileset', 204).setOrigin(0).setDepth(99)

        this.reachableTiles = [this.startPosition]
        for (let i = 0; i < this.selectedUnit.move; i++) {
            this.reachableTiles.forEach((tile) => {
                let neighbors = this.scene.battleMap.getNeighboringTiles(tile);
                let newPaths = neighbors.filter(neighborTile => !this.reachableTiles.find((storedTile) => storedTile === neighborTile)).filter(tile => !tile.hasUnit() || tile.getUnit().player === this.selectedUnit.player)
                this.reachableTiles.push(...newPaths)
            })
        }
        this.reachableTiles = this.reachableTiles.filter(tile => !tile.hasUnit() || tile.getUnit() === this.selectedUnit)
        this.overlay = this.scene.battleMap.displayOverlay(this.reachableTiles, {tint: 0x10aded})
    }

    pointerMove(position) {
        let hoveredTile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
        this.cursor.setPosition(hoveredTile.x * this.scene.battleMap.tileWidth, hoveredTile.y * this.scene.battleMap.tileHeight)

        if (undefined !== this.reachableTiles.find(reachableTile => reachableTile === hoveredTile)) {
            this.cursor.setFrame(204)
        } else {
            this.cursor.setFrame(207)
        }
    }

    pointerDown(position) {
        if (!this.scene.battleMap.isOutOfBounds(position)) {
            this.overlay.map(image => image.destroy(this.scene))
            let targettedTile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
            this.selectionHalo.destroy()

            if (undefined !== this.reachableTiles.find(reachableTile => reachableTile === targettedTile)) {
                this.startPosition.setUnit(null)
                targettedTile.setUnit(this.selectedUnit)
                this.selectedUnit.hasMoved = true
                this.selectedUnit.sprite.setPosition(targettedTile.x * this.scene.battleMap.tileWidth, targettedTile.y * this.scene.battleMap.tileHeight)
                this.selectedUnit.sprite.tint = 0xabacab

                if (this.scene.battleMap.getNeighboringTiles(targettedTile).filter(tile => tile.hasUnit() && tile.getUnit().player !== this.activePlayer).length > 0) {
                    this.scene.state = new AttackState(Object.assign(this, {startPosition: targettedTile}), this.scene)
                } else if (this.scene.battleMap.getPlayersUnits(this.activePlayer).reduce(
                    (canPlay, unit) => !unit.hasMoved || canPlay,
                    false)
                ) {
                    this.scene.state = new SelectState(this, this.scene)
                } else {
                    this.scene.state = new SelectState(new SwitchTurnState(this, this.scene), this.scene)
                }
            } else {
                this.scene.state = new SelectState(this, this.scene)
            }

        }
    }
}

export default MoveState