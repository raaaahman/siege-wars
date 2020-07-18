import Phaser from "phaser"
import unitTable from '../data/units.json'
import tilesetImg from "../assets/Tile-set - Toen's Medieval Strategy (16x16) - v.1.0.png"
import {UnitFactory} from "../objects/Unit"
import BattleMap from "../objects/BattleMap";

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
        this.tileWidth = 16
        this.tileHeight = 16
    }

    preload() {
        this.load.spritesheet('tileset', tilesetImg, {frameWidth: this.tileWidth, frameHeight: this.tileHeight})
    }

    create() {
        const layers = {
            terrain: `
            2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3
            2,3,2,3,2,3,2,3,2,3,2
            3,2,3,2,3,2,3,2,3,2,3`,
            units: [
                    `
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,ARC,...,KNT,...,SPR,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,SWD,...,SPR,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...`,
                `
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,...,...,SPR,...,SWD,...
                    ...,...,...,...,...,...,...,...,...,...,...
                    ...,...,...,...,...,SPR,...,KNT,...,ARC,...
                    ...,...,...,...,...,...,...,...,...,...,...`
            ]
        }

        const battleMap = new BattleMap(layers, this)

        const redUnits = new UnitFactory(unitTable, this).forPlayer({color: 'red'}).fromCSV(layers.units[0])

        const blueUnits = new UnitFactory(unitTable, this).forPlayer({color: 'blue'}).fromCSV(layers.units[1])
    }

    upload() {

    }
}

export default GameScene