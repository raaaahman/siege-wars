import Phaser from "phaser"
import unitTable from '../data/units.json'
import tilesetImg from "../assets/Tile-set - Toen's Medieval Strategy (16x16) - v.1.0.png"
import {UnitFactory} from "../objects/Unit"
import CSVParser from '../helpers/CSVParser'

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
        this.gridWidth = 16
        this.gridHeight = 16
    }

    preload() {
        this.load.spritesheet('tileset', tilesetImg, {frameWidth: this.gridWidth, frameHeight: this.gridHeight})
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

        const tilemap = CSVParser.fromString(battlemap.terrain).map((value, position) => {
            let tile = this.add.image(position.x * 16, position.y * 16, 'tileset', value)
            tile.setOrigin(0)
            return tile
        })

        const redUnits = new UnitFactory(unitTable, this).forPlayer({color: 'red'}).fromCSV(battlemap.units[0])

        const blueUnits = new UnitFactory(unitTable, this).forPlayer({color: 'blue'}).fromCSV(battlemap.units[1])
    }

    upload() {

    }
}

export default GameScene