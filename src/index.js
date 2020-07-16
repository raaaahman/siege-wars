import Phaser from "phaser"
import TitleScreen from './scenes/TitleScreen'
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 240,
  height: 160,
  pixelArt: true,
  roundPixels: false,
  zoom: 2.5,
  scene: [TitleScreen, GameScene]
};

const game = new Phaser.Game(config)

