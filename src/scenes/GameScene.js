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

        this.battleMap.load(layers)

        let player1 = {color: 'red'};
        let player2 = {color: 'blue'};

        let units = new UnitFactory(unitTable, this).forPlayer(player1).fromCSV(layers.units[0])
        this.units = units.concat(new UnitFactory(unitTable, this).forPlayer(player2).fromCSV(layers.units[1]))

        this.infoText = {
            unitName: this.add.text(180, 4, '', {font: '10px monospace'}),
            unitPlayer: this.add.text(180, 16, '', {font: '10px monospace'})
        }
        this.state = { activePlayer: player1 }

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
                let hoveredUnit = this.getUnitAt(tile.x, tile.y);

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

                this.cursor.setPosition(tile.x,tile.y)

            }

        })

        this.input.on('pointerdown', () => {
            if (!this.battleMap.isOutOfBounds(this.input.activePointer.position)) {

            }
        })
    }

    getUnitAt(pointerX, pointerY) {
        let hoveredUnit = this.units.find((unit) =>
            unit.sprite.x - (unit.sprite.x % this.tileWidth) === pointerX &&
            unit.sprite.y - (unit.sprite.y % this.tileHeight) === pointerY
        )
        return hoveredUnit;
    }

    update(time, delta) {

    }
}

export default GameScene