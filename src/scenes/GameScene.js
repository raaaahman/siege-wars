import Phaser from "phaser"
import tilesetImg from "../assets/Tile-set - Toen's Medieval Strategy (16x16) - v.1.0.png"
import shadedGrid from "../assets/shaded-grid-light.png"
import infoPanelImg from "../assets/info-panel.png"
import menuPanelImg from "../assets/menu-panel.png"
import buttonLargeImg from "../assets/button-large.png"
import BattleMap from "../objects/BattleMap"
import SwitchTurnState from "../objects/SwitchTurnState"

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
        this.tileWidth = 16
        this.tileHeight = 16
        this.battleMap = new BattleMap(this, 16, 16)
    }

    preload() {
        this.load.spritesheet('tileset', tilesetImg, {frameWidth: this.tileWidth, frameHeight: this.tileHeight})
        this.load.spritesheet('shadedGrid', shadedGrid, {frameWidth: this.tileWidth, frameHeight: this.tileHeight})
        this.load.image('infoPanel', infoPanelImg)
        this.load.image('menuPanel', menuPanelImg)
        this.load.spritesheet('buttonLarge', buttonLargeImg, {frameWidth: 56, frameHeight: 18})
    }

    create() {
        const layers = {
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

        this.players = [
            {color: 'red'},
            {color: 'blue'}
        ]

        this.battleMap.load(layers, this.players)

        this.infoPanel = this.add.image(178, 2, 'infoPanel').setOrigin(0).setDepth(99).setVisible(false)
        this.infoText = {
            unitName  : this.add.text(183, 6, '', {font: '10px monospace'}).setDepth(99),
            unitPlayer: this.add.text(183, 18, '', {font: '10px monospace'}).setDepth(99),
            unitHp    : this.add.text(183, 30, '', {font: '10px monospace'}).setDepth(99),
            unitDamage: this.add.text(183, 42, '', {font: '10px monospace'}).setDepth(99)
        }
        let cursor = this.add.image(
            this.input.activePointer.position.x - (this.input.activePointer.position.x % this.tileWidth),
            this.input.activePointer.position.y - (this.input.activePointer.position.y % this.tileHeight),
            'tileset'
        ).setOrigin(0).setDepth(99)
        this.state = new SwitchTurnState({activePlayer: this.players[-1], cursor: cursor}, this)

        this.input.on('pointermove', () => {
            this.state.pointerMove(this.input.activePointer.position)
        })

        this.input.on('pointerdown', () => {
           this.state.pointerDown(this.input.activePointer.position)
        })
    }

    update(time, delta) {

    }
}

export default GameScene