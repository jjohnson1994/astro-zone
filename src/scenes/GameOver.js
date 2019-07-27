import Phaser from 'phaser'
import WebFont from 'webfontloader'

let
  playerLost,
  playerScore,
  player2Score,
  playerScoreDisp

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameOver' })
  }

  init (data) {
    playerLost = data.timedOut ? data.player.score > data.player2.score : data.player.damage < data.player2.damage
    playerScore = data.player.score
    player2Score = data.player2.score
  }

  preload () {
    const winString = playerLost ? 'YOU WON, U R THE BEST. U LEDGENDDDDDD' : 'LOSER! TRY NexT TiME YeaAH'
    this.add.image(0, 0, 'background7')
    playerScoreDisp = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3, winString)
    playerScoreDisp.setOrigin(0.5, 1)

    this.add.text(
      this.cameras.main.width / 3,
      this.cameras.main.height / 2 + 50,
      `Player 1: ${player2Score}`
    )
      .setOrigin(0.5, 1)
      .setShadow(2, 2, '#000', 2, true, false)

    this.add.text(
      (this.cameras.main.width / 3) * 2, 
      this.cameras.main.height / 2 + 50, 
      `Player 2: ${player2Score}`
    )
      .setOrigin(0.5, 1)
      .setShadow(2, 2, '#000', 2, true, false)
  }
}
