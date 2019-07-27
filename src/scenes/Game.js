import Phaser from 'phaser'
import Channel from '../channel'
import Bullet from '../bullet'
import Asteroid from '../asteroid'
import Explosion from '../explosion'
import AsteroidPositions from '../asteroid-positions'

let
  cursors,
  fire,
  player,
  player2,
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  bullets,
  asteroids,
  damageText,
  damage2Text,
  playerScore,
  player2Score,
  countDown

let lastFired = 0
let fireLimit = 125
let gameOver = false

const player2Data = {
  openTokID: '',
  x: 0,
  y: 0,
  rotation: 0,
  speed: 0,
  damage: 0,
  score: 0
}

const setCircularBody = body => {
  body.setCircle(
    body.height > body.width ? body.width / 2 : body.height / 2
  )
}

const setCircularBodyPlayer = body => {
  body.setCircle(
    body.height > body.width ? body.width / 4 : body.height / 4,
    body.width / 4, body.height / 4
  )
}

const leftPadScore = score => {
  const pad = '00000000'
  const strScore = `${score}`
  return pad.substring(0, pad.length - strScore.length) + strScore
}

const leftPadCountdown = countdown => {
  const pad = '000'
  const strScore = `${countdown}`
  return pad.substring(0, pad.length - strScore.length) + strScore
}

const endGameDate = () => ({
  player: {
    score: player.getData('score'),
    damage: player.getData('damage')
  },
  player2: {
    score: player2Data.score,
    damage: player2Data.damage
  }
})

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {
    Channel.onJoin((event) => {
      console.log('player joined')
      player2Data.openTokID = event.target.connection.id
    })

    Channel.onPlayer2Updated(data => {
      player2Data.x = data.x
      player2Data.y = data.y
      player2Data.rotation = data.rotation
      player2Data.speed = data.speed
      player2Data.damage = data.damage || 0
      player2Data.score = data.score || 0

      player2Score.setText(leftPadScore(player2Data.score))
      damage2Text.setText(`❤ ${(((255 - player2Data.damage) / 255) * 100).toFixed(2)}%`)

      // const damagePerc = (((255 - data.damage) / 255) * 100)
      // const damHex = intToHex(damagePerc)

      // player2.setTint(`0x${damHex}ff0000`)
    })

    Channel.onGameOver(() => {
      gameOver = true
      this.scene.start(
        'GameOver',
        {
          timedOut: false,
          ...endGameDate()
        }
      )
    })

    Channel.initSession()
  }
  preload () {
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
    player = this.physics.add.image(
      70,
      Math.random() * this.cameras.main.height,
      'player'
    ).setDepth(1).setScale(0.5)

    player2 = this.physics.add.image(
      70,
      (Math.random() * this.cameras.main.height - 100) + 50,
      'player2'
    ).setDepth(1).setScale(0.5)

    setCircularBodyPlayer(player)
    setCircularBodyPlayer(player2)

    // Camera
    this.cameras.main.startFollow(player)
    this.cameras.main.setBounds(0, 0, 600, 500)

    // Controlls
    cursors = this.input.keyboard.createCursorKeys()
    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // Player Physics
    player.setDrag(300)
    player.setAngularDrag(400)
    player.setMaxVelocity(600)
    player.setCollideWorldBounds(true)

    // Player Particle Emitterso
    /**
    const player1Particles = this.add.particles('green')
    const player2Particles = this.add.particles('red')

    const player1Emitter = player1Particles.createEmitter({
      speed: 100,
      lifespan: {
        onEmit: function () {
          return Phaser.Math.Percent(player.body.speed, 0, 300) * 2000
        }
      },
      alpha: {
        onEmit: function () {
          return Phaser.Math.Percent(player.body.speed, 0, 300)
        }
      },
      angle: {
        onEmit: function () {
          var v = Phaser.Math.Between(-10, 10)
          return (player.angle - 180) + v
        }
      },
      scale: { start: 0.6, end: 0 },
      blendMode: 'ADD'
    })

    const player2Emitter = player2Particles.createEmitter({
      speed: 100,
      lifespan: {
        onEmit: () =>
          Phaser.Math.Percent(player2Data.speed, 0, 300) * 2000
      },
      alpha: {
        onEmit: () =>
          Phaser.Math.Percent(player2Data.speed, 0, 300)
      },
      angle: {
        onEmit: () =>
          (player2Data.angle - 180) + Phaser.Math.Between(-10, 10)
      },
      scale: { start: 0.6, end: 0 },
      blendMode: 'ADD'
    })

    player1Emitter.startFollow(player)
    player2Emitter.startFollow(player2)
    */

    // Animations
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    // Bullets
    bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true
    })

    asteroids = this.physics.add.group({
      immovable: true
    })

    // Add Asteroids
    AsteroidPositions.forEach(({ id, x, y, size }) => {
      const asteroid = this.physics.add.image(x, y, `asteroid${size}`)
      asteroid.setScale(0.3)
      asteroids.add(asteroid)
      asteroid.setVelocity(-200, 0)

      setCircularBody(asteroid)

      asteroid.setCircle(
        asteroid.height > asteroid.width ? asteroid.width / 2 : asteroid.height / 2
      )
    })

    /**
     * Collisions
     */

    // Player hits asteroid
    this.physics.add.collider(player, asteroids, () => {
      const playerDamage = player.getData('damage') || 0
      const newPlayerDamage = playerDamage + 1

      player.setData('damage', newPlayerDamage)

      damageText.setText(`❤ ${(((255 - newPlayerDamage) / 255) * 100).toFixed(2)}%`)
    })

    // Bullet hits asteroid
    this.physics.add.collider(bullets, asteroids, (bullet, asteroid) => {
      bullet.destroy()

      asteroid.setData('health', (asteroid.getData('health') || 60) - 10)
      player.setData('score', (player.getData('score') || 0) + 100)

      if (asteroid.getData('health') <= 0) {
        console.log('asteroid dead')
        asteroid.destroy()
        player.setData('score', (player.getData('score') || 0) + asteroid.width)
      }

      playerScore.setText(leftPadScore(player.getData('score')))
    })

    // HUD
    damageText = this.add.text(20, this.cameras.main.height - 50, '❤ 100.00%', { fontSize: '32px', fill: '#fff' })
    damageText.setScrollFactor(0)

    damage2Text = this.add.text(this.cameras.main.width - 20, this.cameras.main.height - 50, '❤ 100.00%', { fontSize: '32px', fill: '#fff' }).setOrigin(1, 0)
    damage2Text.setScrollFactor(0)

    playerScore = this.add.text(20, 20, '000000', { fontSize: '32px', fill: '#fff' })
    playerScore.setScrollFactor(0)

    player2Score = this.add.text(this.cameras.main.width - 20, 20, '000000', { fontSize: '32px', fill: '#fff' }).setOrigin(1, 0)
    player2Score.setScrollFactor(0)

    countDown = this.add.text(this.cameras.main.width / 2, 20, '00:00', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0)

    // Sync Player data
    setInterval(() => {
      if (!gameOver) {
        Channel.signalPlayerData({
          x: player.x,
          y: player.y,
          rotation: player.rotation,
          speed: player.body.speed,
          damage: player.getData('damage'),
          score: player.getData('score')
        })
      }
    }, 1000 / 24)
  }

  update (time) {
    const timeLeft = (150 - (time / 1000)).toFixed()
    countDown.setText(leftPadCountdown(timeLeft))

    // this.physics.world.wrap(player, 48)

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

    if (fire.isDown && time > lastFired) {
      const bullet = bullets.get()

      if (bullet) {
        lastFired = time + fireLimit
        bullet.fire(player)
      }
    }

    if (player.getData('damage') >= 255) {
      gameOver = true
      Channel.signalGameOver()
      this.scene.start(
        'GameOver',
        {
          timedOut: false,
          ...endGameDate()
        }
      )
    }

    if (timeLeft <= 0) {
      gameOver = true
      Channel.signalGameOver()
      this.scene.start(
        'GameOver',
        {
          timedOut: true,
          ...endGameDate()
        }
      )
    }

    player2.x = player2Data.x
    player2.y = player2Data.y
    player2.rotation = player2Data.rotation
  }
}
