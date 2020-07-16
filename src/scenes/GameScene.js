import Phaser from "phaser"
import tilesetImg from "../assets/Tile-set - Toen's Medieval Strategy (16x16) - v.1.0.png"

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.spritesheet('tileset', tilesetImg, {frameWidth: 16, frameHeight: 16})
        // this.textures.create('tileset', tilesetImg, 16, 16)
    }

    create() {
        const GRID_WIDTH = 15
        const GRID_HEIGHT = 10

        for(let j = 0; j < GRID_HEIGHT; j++) {
            for(let i = 0; i < GRID_WIDTH; i++) {
                let frameNb = j % 2 === 0 ?
                    ( i % 2 === 0 ? 2 : 3 ) :
                    ( i % 2 === 0 ? 3 : 2 )
                let tile = this.add.image(i * 16, j * 16, 'tileset', frameNb)
                tile.setOrigin(0)
            }
        }
    }


    upload() {

    }
}

export default GameScene