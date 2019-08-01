import Phaser from 'phaser'
import firebase from '../firebase'

let
  background,
  globalHighScore,
  player2Status,
  playButton

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'SplashScene' })
  }

  preload () {
    //
    // load your assets
    //
    // Background textures
    this.load.image('background1', 'assets/Backgrounds/PNG_and_JPG/background_01_parallax_01.png')
    this.load.image('background2', 'assets/Backgrounds/PNG_and_JPG/background_01_parallax_02.png')
    this.load.image('background3', 'assets/Backgrounds/PNG_and_JPG/background_01_parallax_03.png')
    this.load.image('background4', 'assets/Backgrounds/PNG_and_JPG/background_01_parallax_04.png')
    this.load.image('background5', 'assets/Backgrounds/PNG_and_JPG/background_01_parallax_05.png')
    this.load.image('background6', 'assets/Backgrounds/PNG_and_JPG/background_01_parallax_06.png')
    this.load.image('background7', 'assets/Backgrounds/PNG_and_JPG/background_02_static.png')
    this.load.image('background8', 'assets/GUI/PNG/background_menu.png')
    this.load.image('red', 'assets/Particles/red.png')
    this.load.image('green', 'assets/Particles/green.png')

    // Player textures
    this.load.image('player', 'assets/Spaceships/PNG/DKO-api-X1.png')
    this.load.image('playerV2', 'assets/Spaceships/PNG/DKO-api-X2.png')
    this.load.image('playerV3', 'assets/Spaceships/PNG/DKO-api-X3.png')
    this.load.image('player2', 'assets/Spaceships/PNG/CX16-X1.png')
    this.load.image('player2V2', 'assets/Spaceships/PNG/CX16-X2.png')
    this.load.image('player2V3', 'assets/Spaceships/PNG/CX16-X3.png')

    // Asteroids
    this.load.image('asteroid1', 'assets/Asteroids/PNG/asteroid_01.png')
    this.load.image('asteroid2', 'assets/Asteroids/PNG/asteroid_02.png')
    this.load.image('asteroid3', 'assets/Asteroids/PNG/asteroid_03.png')
    this.load.image('asteroid4', 'assets/Asteroids/PNG/asteroid_04.png')
    this.load.image('asteroid5', 'assets/Asteroids/PNG/asteroid_05.png')
    this.load.image('asteroid6', 'assets/Asteroids/PNG/asteroid_06.png')

    // Explosion
    this.load.spritesheet('explosion', 'assets/Explosions/PNG/explosion.png', { frameWidth: 140, frameHeight: 140 })

    // Weapons
    this.load.image('bullet_small', 'assets/Weapons/PNG/bullet_blaster_small_single.png')
    this.load.image('mushroom', 'assets/images/mushroom2.png')

    // GUI
    this.load.image('game_logo', 'assets/GUI/PNG/game_logo.png')
    this.load.image('mainButton1', 'assets/GUI/PNG/main_button_1.png')
    this.load.image('buttonArrowRight', 'assets/GUI/PNG/button_arrow_right.png')

  }

  create () {
    background = this.add.image(0, 0, 'background8')
    playButton = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.8,
      'mainButton1'
    )
      .setScale(0.4)
      .setInteractive()

    this.add.image(
      (this.cameras.main.width / 2) - 152,
      (this.cameras.main.height * 0.8) - 2,
      'buttonArrowRight'
    )
      .setScale(0.6)

    this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.4,
      'game_logo'
    )
      .setOrigin(0.5, 0.5)
      .setScale(0.6)

    this.add.text(25, 20, 'TOP SCORE', { fontSize: '20px', fill: '#fff' })
    globalHighScore = this.add.text(20, 40, '000000', { fontSize: '42px', fill: '#fff' })
    firebase.getTopScore().then(({ topScore, initials }) => {
      globalHighScore.setText(`${initials}_` + `${topScore}`.padStart(6, '0'))
    })

    player2Status = this.add.text(
      this.cameras.main.width / 2,
      (this.cameras.main.height * 0.8) + 5,
      'PLAY',
      { fontSize: '25px', fill: '#f0ffff' }
    ).setOrigin(0.5, 0.5)

    playButton.once(
      'pointerup',
      () => {
        this.scene.start('GameScene')
      }
    )
  }

  update () {}
}
