import Phaser from "phaser";
import logoImg from "../assets/logo.png";

class TitleScreen extends Phaser.Scene {
    constructor() {
        super('TitleScreen')
    }

    preload() {
        this.load.image("logo", logoImg);
    }

    create() {
        const logo = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "logo");
        const pressStart = this.add.text(this.game.config.width / 2, this.game.config.height - 24, 'Click to Start', {font: '12px monospace'}).setOrigin(0.5)
        this.input.on('pointerdown', () => {this.scene.start('GameScene')}, this)
    }
}

export default TitleScreen