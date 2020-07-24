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
        this.battleMap = new BattleMap(this, 16, 16)
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

        const players= [
            {color: 'red'},
            {color: 'blue'}
        ]

        this.battleMap.load(layers, players)

        this.infoText = {
            unitName: this.add.text(180, 4, '', {font: '10px monospace'}),
            unitPlayer: this.add.text(180, 16, '', {font: '10px monospace'})
        }
        this.state = { activePlayer: players[0] }

        let cursorImages = { red: 297, blue: 298, green: 299, yellow: 300}
        this.cursor = this.add.image(
            this.input.activePointer.position.x - (this.input.activePointer.position.x % this.tileWidth),
            this.input.activePointer.position.y - (this.input.activePointer.position.y % this.tileHeight),
            'tileset',
            cursorImages[this.state.activePlayer.color]
        )
        this.cursor.setOrigin(0)

        this.input.on('pointermove', () => {
            if (!this.battleMap.isOutOfBounds(this.input.activePointer.position)) {
                let tile = this.battleMap.getTileAt(this.input.activePointer.position);
                let hoveredUnit = tile.getUnit();

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

                this.cursor.setPosition(tile.x * this.tileWidth,tile.y * this.tileHeight)

            }

        })

        this.input.on('pointerdown', () => {
            if (!this.battleMap.isOutOfBounds(this.input.activePointer.position)) {

            }
        })
    }

    update(time, delta) {

    }
}

export default GameScene