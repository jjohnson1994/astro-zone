import Phaser from 'phaser'

export default new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize: function Explosion (scene) {
    Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'explosion')
    
    this.lifespan = 1000
    this.setDepth(1)
    this.setAlpha(1)

    this.setScale(Math.random())

    this._temp = new Phaser.Math.Vector2()
  },

  explode: function (x, y) {
    this.lifespan = 1000

    this.setActive(true)
    this.setVisible(true)
    this.setPosition(x, y)
    this.body.reset(x, y)
  },

  update: function (time, delta) {
    this.lifespan -= delta

    if (this.lifespan <= 0) {
      this.setAlpha(1)
      this.setActive(false)
      this.setVisible(false)
      this.body.stop()
    }

    this.setAngle(this.angle + 10)
    // this.setScale(this.scale + 2)
    this.setAlpha(this.alpha - 0.05)
  }
})
