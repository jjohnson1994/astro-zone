/* globals __DEV__ */
import Phaser from 'phaser'
import Channel from '../channel'

let cursors, player, player2, background1, background2, background3, background4, background5, background6

const player2Data = {
  openTokID: '',
  x: 0,
  y: 0,
  rotation: 0,
  damage: ''
}

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {
    Channel.onJoin((event) => {
      player2Data.openTokID = event.target.connection.id
    })

    Channel.onPlayer2Updated(data => {
      player2Data.x = data.x
      player2Data.y = data.y
      player2Data.rotation = data.rotation
      player2Data.damage = data.damage
    })

    Channel.initSession()
  }
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
    background1 = this.add.image(0, 0, 'background1').setDepth(0)
    background2 = this.add.image(0, 0, 'background2').setDepth(0)
    background3 = this.add.image(100, 300, 'background3').setDepth(0)
    background4 = this.add.image(1300, 700, 'background4').setDepth(0)
    background5 = this.add.image(0, 0, 'background5').setDepth(2)
    background6 = this.add.image(0, 0, 'background6').setDepth(2)

    // Add Player 1
    player = this.physics.add.image(0, 0, 'player').setDepth(1).setScale(0.5)
    player2 = this.physics.add.image(0, 0, 'player2').setDepth(1).setScale(0.5)

    // Camera
    this.cameras.main.startFollow(player)

    // Controlls
    cursors = this.input.keyboard.createCursorKeys()

    // Player Physics
    player.setDrag(300)
    player.setAngularDrag(400)
    player.setMaxVelocity(600)

    window.setInterval(() => {
      Channel.signalPlayerData({
        x: player.x,
        y: player.y,
        rotation: player.rotation
      })
    }, 1000 / 24)
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

    player2.x = player2Data.x
    player2.y = player2Data.y
    player2.rotation = player2Data.rotation

    background1.x += player.body.deltaX() * 0.3
    background1.y += player.body.deltaY() * 0.3
    background2.x += player.body.deltaX() * 0.5
    background2.y += player.body.deltaY() * 0.5
    background3.x += player.body.deltaX() * 0.5
    background3.y += player.body.deltaY() * 0.5
    background4.x += player.body.deltaX() * 0.6
    background4.y += player.body.deltaY() * 0.6
    background5.x += player.body.deltaX() * 0.7
    background5.y += player.body.deltaY() * 0.7
    background6.x += player.body.deltaX() * 0.8
    background6.y += player.body.deltaY() * 0.8
  }
}
