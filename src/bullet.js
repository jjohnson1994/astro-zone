import Phaser from 'phaser'

export default new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Image,
  initialize: function Bullet (scene) {
    Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'bullet_small')

    this.setBlendMode(1)
    this.setDepth(1)

    this.speed = 1000
    this.lifespan = 1000

    this._temp = new Phaser.Math.Vector2()
  },
  fire: function (player) {
    this.lifespan = 1000

    this.setActive(true)
    this.setVisible(true)
    this.setAngle(player.body.rotation)
    this.setPosition(player.x, player.y)
    this.body.reset(player.x, player.y)

    var angle = Phaser.Math.DegToRad(player.body.rotation)

    this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity)

    this.body.velocity.x *= 2
    this.body.velocity.y *= 2
  },

  update: function (time, delta) {
    this.lifespan -= delta

    if (this.lifespan <= 0) {
      this.setActive(false)
      this.setVisible(false)
      this.body.stop()
    }
  }
})
