import GameState from "./GameState"
import SelectState from "./SelectState"

class MenuState extends GameState {
    pointerDown() {
        this.scene.state = new SelectState(this, this.scene)
    }
}

export default MenuState