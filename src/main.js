import Phaser from 'phaser'

import BootScene from './scenes/Boot'
import SplashScene from './scenes/Splash'
import GameScene from './scenes/Game'
import GameOver from './scenes/GameOver'

import config from './config'

const gameConfig = Object.assign(config, {
  scene: [BootScene, SplashScene, GameScene, GameOver]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game()
