const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp({
  apiKey: 'AIzaSyBO2NPYd5ulsJUhgjEtR9ywnuPdLk3E2hw',
  authDomain: 'astro-zone-a5778.web.app',
  projectId: 'astro-zone-a5778'
})

const db = firebase.firestore()

export default {
  getTopScore: () => new Promise(resolve => {
    db.collection('gamedata').get().then((querySnapshot) => {
      let topScore = 0
      let initials = ''
      querySnapshot.forEach((doc) => {
        topScore = doc.data().score
        initials = doc.data().initials
      })
      resolve({ topScore, initials })
    })
  }),

  setHighScore (score, initials) {
    db.collection('gamedata').doc('topscore').set({
      score: score,
      initials
    })
  }
}
