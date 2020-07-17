import Phaser from "phaser"
import unitTable from '../data/units.json'
import tilesetImg from "../assets/Tile-set - Toen's Medieval Strategy (16x16) - v.1.0.png"
import {UnitFactory} from "../objects/Unit";

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
            3,2,3,2,3,2,3,2,3,2,3,2,3,2,3`,
            units: [
                    `
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,ARC,...,KNT,...,SPR,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,SWD,...,SPR,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...`,
                `
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...,SPR,...,SWD,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,SPR,...,KNT,...,ARC,...
                    ...,...,...,...,...,...,...,...,...,...,...,...,...,...,...`
            ]
        }

        let rows = battlemap.terrain.trim().split("\n").map((row) => row.trim().split(','))
        for (let j = 0; j < rows.length; j++) {
            for (let i = 0; i < rows[j].length; i++) {
                let tile = this.add.image(i * 16, j * 16, 'tileset', rows[j][i])
                tile.setOrigin(0)
            }
        }

        const unitFactory = new UnitFactory(unitTable, this)

        let redUnits = battlemap.units[0].trim().split("\n").map((row) => row.trim().split(','))
        for (let j = 0; j < redUnits.length; j++) {
            for (let i = 0; i < redUnits[j].length; i++) {
                unitFactory.create('red', redUnits[j][i],{x: i * 16, y: j * 16})
            }
        }

        let blueUnits = battlemap.units[1].trim().split("\n").map((row) => row.trim().split(','))
        for (let j = 0; j < blueUnits.length; j++) {
            for (let i = 0; i < blueUnits[j].length; i++) {
                unitFactory.create('blue', blueUnits[j][i], {x: i * 16, y: j * 16})
            }
        }
    }



    upload() {

    }
}

export default GameScene