import GameState from "./GameState"
import SelectState from "./SelectState"

class MoveState extends GameState {
    constructor(previousState, scene) {
        super(previousState, scene)
        this.selectedUnit = previousState.selectedUnit

        let reachableTiles = [this.scene.battleMap.getTileAt(this.selectedUnit.position)]
        for (let i = 0; i < this.selectedUnit.move; i++) {
            reachableTiles.forEach((tile) => {
                let neighbors = this.scene.battleMap.getNeighboringTiles(tile);
                let newPaths = neighbors.filter(neighborTile => ! reachableTiles.find((storedTile) => storedTile === neighborTile))
                reachableTiles.push(...newPaths)
            })
        }
        this.overlay = reachableTiles.map((tile) => {
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
            let tile = this.scene.battleMap.getTileAt(this.scene.battleMap.computeCoordinates(position))
            let hoveredUnit = tile.getUnit()

            if (hoveredUnit === this.selectedUnit) {
                this.overlay.map(image => image.destroy(this.scene))
                this.scene.state = new SelectState(this, this.scene)
            }

        }
    }
}

export default MoveState