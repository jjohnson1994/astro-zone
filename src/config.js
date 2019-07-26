import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  localStorageName: 'phasergame',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
}
