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

        this.battleMap = new BattleMap(layers, this)

        let units = new UnitFactory(unitTable, this).forPlayer({color: 'red'}).fromCSV(layers.units[0])
        this.units = units.concat(new UnitFactory(unitTable, this).forPlayer({color: 'blue'}).fromCSV(layers.units[1]))

        this.cursor = this.add.image(
            this.input.activePointer.position.x - (this.input.activePointer.position.x % this.tileWidth),
            this.input.activePointer.position.y - (this.input.activePointer.position.y % this.tileHeight),
            'tileset',
            297
        )
        this.cursor.setOrigin(0)

        this.infoText = {
            unitName: this.add.text(180, 4, '', {font: '10px monospace'}),
            unitPlayer: this.add.text(180, 16, '', {font: '10px monospace'})
        }

        this.input.on('pointermove', () => {
            if (!this.battleMap.isOutOfBounds(this.input.activePointer.position)) {
                let pointerX = this.input.activePointer.position.x - (this.input.activePointer.position.x % this.tileWidth);
                let pointerY = this.input.activePointer.position.y - (this.input.activePointer.position.y % this.tileHeight);
                this.cursor.setPosition(
                    pointerX,
                    pointerY
                )

                let hoveredUnit = this.units.find((unit) =>
                    unit.sprite.x - (unit.sprite.x % this.tileWidth) === pointerX &&
                    unit.sprite.y - (unit.sprite.y % this.tileHeight) === pointerY
                )

                /*
                let guiDimensions = {
                    x: 176,
                    y: 0,
                    width: 48,
                    height: 160
                }
                */

                if (hoveredUnit) {
                    this.infoText.unitName.setText(hoveredUnit.name)
                    this.infoText.unitPlayer.setText(hoveredUnit.player.color)
                } else {
                    this.infoText.unitName.setText('')
                    this.infoText.unitPlayer.setText('')
                }



            }

        })
    }

    update(time, delta) {

    }
}

export default GameScene