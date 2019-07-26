/* globals __DEV__ */
import Phaser from 'phaser'

let cursors, player, player2, background1, background2, background3, background4, background5, background6

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {
    // Background textures
    this.load.image('background1', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_01.png')
    this.load.image('background2', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_02.png')
    this.load.image('background3', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_03.png')
    this.load.image('background4', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_04.png')
    this.load.image('background5', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_05.png')
    this.load.image('background6', '../../assets/Backgrounds/PNG_and_JPG/background_01_parallax_06.png')

    // Player textures
    this.load.image('player', '../../assets/Spaceships/PNG/DKO-api-X1.png')
    this.load.image('playerV2', '../../assets/Spaceships/PNG/DKO-api-X2.png')
    this.load.image('playerV3', '../../assets/Spaceships/PNG/DKO-api-X3.png')
    this.load.image('player2', '../../assets/Spaceships/PNG/CX16-X1.png')
    this.load.image('player2V2', '../../assets/Spaceships/PNG/CX16-X2.png')
    this.load.image('player2V3', '../../assets/Spaceships/PNG/CX16-X3.png')
  }

  create () {
    // Backgrounds
    background1 = this.add.image(0, 0, 'background1').setDepth(0);
    background2 = this.add.image(0, 0, 'background2').setDepth(0);
    background5 = this.add.image(0, 0, 'background5').setDepth(2);
    background6 = this.add.image(0, 0, 'background6').setDepth(2);

    // Add Player 1
    player = this.physics.add.image(0, 0, 'player').setDepth(1).setScale(0.5);

    // Camera
    this.cameras.main.startFollow(player)

    // Controlls
    cursors = this.input.keyboard.createCursorKeys()

    // Player Physics
    player.setDrag(300)
    player.setAngularDrag(400)
    player.setMaxVelocity(600)
  }

  update (time, delta) {
    if (cursors.left.isDown) {
      player.setAngularVelocity(-150)
    } else if (cursors.right.isDown) {
      player.setAngularVelocity(150)
    } else {
      player.setAngularVelocity(0)
    }

    if (cursors.up.isDown) {
      this.physics.velocityFromRotation(player.rotation, 600, player.body.acceleration)
    } else {
      player.setAcceleration(0)
    }

    /**
    if (fire.isDown && time > lastFired) {
      var bullet = bullets.get()

      if (bullet) {
        bullet.fire(ship)

        lastFired = time + 100
      }
    }
    */
    background1.x += player.body.deltaX() * 0.5
    background1.y += player.body.deltaY() * 0.5

    background5.x += player.body.deltaX() * 2
    background5.y += player.body.deltaY() * 2
  }
}
