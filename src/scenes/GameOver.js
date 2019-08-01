import Phaser from 'phaser'
import WebFont from 'webfontloader'
import firebase from '../firebase'

let
  playerWon,
  playerScore,
  player2Score,
  playerScoreDisp,
  player2ScoreDisp,
  clickToPlayAgain,
  background,
  newHighScoreText

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameOver' })
  }

  init (data) {
    playerWon = data.timedOut ? data.player.score > data.player2.score : data.player.damage < data.player2.damage
    playerScore = data.player.score
    player2Score = data.player2.score
  }

  preload () {
    const winString = playerWon ? 'YOU WON, U R THE BEST. U LEDGENDDDDDD' : 'LOSER! TRY NexT TiME YeaAH'
    background = this.add.image(0, 0, 'background7').setInteractive()
    playerScoreDisp = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3, winString)
    playerScoreDisp.setOrigin(0.5, 1)

    playerScoreDisp = this.add.text(
      this.cameras.main.width / 3,
      this.cameras.main.height / 2 + 50,
      `Player 1: ${playerScore}`
    )
      .setOrigin(0.5, 1)
    playerScoreDisp.setShadow(0, 0, '#000', 5)

    player2ScoreDisp = this.add.text(
      (this.cameras.main.width / 3) * 2,
      this.cameras.main.height / 2 + 50,
      `Player 2: ${player2Score}`
    )
      .setOrigin(0.5, 1)
    player2ScoreDisp.setShadow(0, 0, '#000', 5)

    newHighScoreText = this.add.text(
      this.cameras.main.width / 2,
      100,
      '',
      {
        fontSize: '42px',
        fill: '#f00'
      }
    )
      .setOrigin(0.5, 0.5)

    clickToPlayAgain = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.75,
      'Click to Play Again'
    )
      .setOrigin(0.5, 0.5)
    clickToPlayAgain.setShadow(0, 0, '#000', 5)

    background.once(
      'pointerup',
      () => {
        window.location.reload()
      },
      true
    )
  }

  create() {
    firebase.getTopScore().then(({ topScore }) => {
      if (playerScore > topScore && playerWon === true) {
        console.log('prompt');
        const initials = window.prompt("NEW HIGH SCORE!!! What's your initials?")
        newHighScoreText.setText('NEW HIGH SCORE!!!')
        firebase.setHighScore(playerScore, initials)
      }
    })
  }
}
