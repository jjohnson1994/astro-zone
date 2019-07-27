import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'SplashScene' })
  }

  preload () {
    //
    // load your assets
    //
    // Background textures
    this.load.image('background1', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_01.png')
    this.load.image('background2', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_02.png')
    this.load.image('background3', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_03.png')
    this.load.image('background4', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_04.png')
    this.load.image('background5', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_05.png')
    this.load.image('background6', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_06.png')
    this.load.image('background7', '../../assets/Backgrounds/PNG_and_JPG/background_02_static.png')
    this.load.image('red', '../../assets/Particles/red.png')
    this.load.image('green', '../../assets/Particles/green.png')

    // Player textures
    this.load.image('player', '../../assets/Spaceships/PNG/DKO-api-X1.png')
    this.load.image('playerV2', '../../assets/Spaceships/PNG/DKO-api-X2.png')
    this.load.image('playerV3', '../../assets/Spaceships/PNG/DKO-api-X3.png')
    this.load.image('player2', '../../assets/Spaceships/PNG/CX16-X1.png')
    this.load.image('player2V2', '../../assets/Spaceships/PNG/CX16-X2.png')
    this.load.image('player2V3', '../../assets/Spaceships/PNG/CX16-X3.png')

    // Asteroids
    this.load.image('asteroid1', '../../assets/Asteroids/PNG/asteroid_01.png')
    this.load.image('asteroid2', '../../assets/Asteroids/PNG/asteroid_02.png')
    this.load.image('asteroid3', '../../assets/Asteroids/PNG/asteroid_03.png')
    this.load.image('asteroid4', '../../assets/Asteroids/PNG/asteroid_04.png')
    this.load.image('asteroid5', '../../assets/Asteroids/PNG/asteroid_05.png')
    this.load.image('asteroid6', '../../assets/Asteroids/PNG/asteroid_06.png')

    // Explosion
    this.load.spritesheet('explosion', '../../assets/Explosions/PNG/explosion.png', { frameWidth: 140, frameHeight: 140 })

    // Weapons
    this.load.image('bullet_small', '../../assets/Weapons/PNG/bullet_blaster_small_single.png')
    this.load.image('mushroom', 'assets/images/mushroom2.png')
  }

  create () {
    this.scene.start('GameScene')
  }

  update () {}
}
