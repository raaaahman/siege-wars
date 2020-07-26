import GameState from "./GameState"
import SelectState from "./SelectState"
import SwitchTurnState from "./SwitchTurnState"

class MoveState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)
        this.selectedUnit = previousState.selectedUnit
        this.startPosition = previousState.startPosition

        this.reachableTiles = [this.startPosition]
        for (let i = 0; i < this.selectedUnit.move; i++) {
            this.reachableTiles.forEach((tile) => {
                let neighbors = this.scene.battleMap.getNeighboringTiles(tile);
                let newPaths = neighbors.filter(neighborTile => !this.reachableTiles.find((storedTile) => storedTile === neighborTile)).filter(tile => !tile.hasUnit() || tile.getUnit().player === this.selectedUnit.player)
                this.reachableTiles.push(...newPaths)
            })
        }
        this.reachableTiles = this.reachableTiles.filter(tile => !tile.hasUnit())
        this.overlay = this.reachableTiles.map(tile => {
            let overlayTile = this.scene.add.image(
                tile.position.x * this.scene.battleMap.tileWidth,
                tile.position.y * this.scene.battleMap.tileHeight,
                'tileset',
                0
            ).setOrigin(0)
            overlayTile.tint = 0x10aded
            overlayTile.setAlpha(0.5)
            return overlayTile
        })
    }

    pointerDown(position) {
        if (!this.scene.battleMap.isOutOfBounds(position)) {
            this.overlay.map(image => image.destroy(this.scene))
            let targettedTile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
            let hoveredUnit = targettedTile.getUnit()

            if (!hoveredUnit && undefined !== this.reachableTiles.find(reachableTile => reachableTile === targettedTile)) {
                this.startPosition.setUnit(null)
                targettedTile.setUnit(this.selectedUnit)
                this.selectedUnit.hasMoved = true
                this.selectedUnit.sprite.setPosition(targettedTile.x * this.scene.battleMap.tileWidth, targettedTile.y * this.scene.battleMap.tileHeight)
                this.selectedUnit.sprite.tint = 0xabacab
                if (this.scene.battleMap.getPlayersUnits(this.activePlayer).reduce(
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