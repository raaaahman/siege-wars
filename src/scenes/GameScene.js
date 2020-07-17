import Phaser from "phaser"
import tilesetImg from "../assets/Tile-set - Toen's Medieval Strategy (16x16) - v.1.0.png"

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.spritesheet('tileset', tilesetImg, {frameWidth: 16, frameHeight: 16})
    }

    create() {
        const battlemap = {
            terrain: `
            2,3,2,3,2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3,2,3,2,3`
        }

        let rows = battlemap.terrain.trim().split("\n").map((row) => row.trim().split(','))
        for (let j = 0; j < rows.length; j++) {
            for (let i = 0; i < rows[j].length; i++) {
                let tile = this.add.image(i * 16, j * 16, 'tileset', rows[j][i])
                tile.setOrigin(0)
            }
        }
    }



    upload() {

    }
}

export default GameScene