/* globals OT */
import ChannelEvents from './channel-events'

var apiKey = '46393492'
var sessionId = '2_MX40NjM5MzQ5Mn5-MTU2NDEzMzE2ODc3NX5FM0M3dU9yMklsRnVIa0hQZStkcjhiY3N-fg'
var token = 'T1==cGFydG5lcl9pZD00NjM5MzQ5MiZzaWc9ODJmMDdlZTJiZmE0ODUyZDQ0ZGMzOTZhYTFkYWVlOTBhNTlmYzlkMzpzZXNzaW9uX2lkPTJfTVg0ME5qTTVNelE1TW41LU1UVTJOREV6TXpFMk9EYzNOWDVGTTBNM2RVOXlNa2xzUm5WSWEwaFFaU3RrY2poaVkzTi1mZyZjcmVhdGVfdGltZT0xNTY0MTMzMjA3Jm5vbmNlPTAuNTkxODg4Nzg1Mjg5MjcxOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTY2NzI1MjA2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'

let session
let onJoinEvent = () => {}
let onPlayer2UpdatedFunc = () => {}

const channel = {
  initSession,
  onJoin: func => { onJoinEvent = func },
  onPlayer2Updated: func => { onPlayer2UpdatedFunc = func },
  signalPlayerData
}

function emmitOnJoin (event) {
  onJoinEvent(event)
}

function emmitPlayer2Updated (event) {
  onPlayer2UpdatedFunc(event)
}

// Handling all of our errors here by alerting them
function handleError (error) {
  if (error) {
    alert(error.message)
  }
}

function initSession () {
  session = OT.initSession(apiKey, sessionId)

  /**
   * Called when another player enters the game
   */
  session.on('streamCreated', event => {
    console.log('stream created')
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError)

    emmitOnJoin(event)
  })

  /**
   * Called when a player leaves the game
   */
  session.on('streamDestroyed', event => {
    console.log('streamDestroyed', event)
  })

  /**
   * Signal Events
   */
  session.on('signal:JOIN', event => {
    if (event.from.connectionId !== session.connection.connectionId) {
      console.log('join', event.from.connectionId)
    }
  })

  session.on('signal:PLAYER_2_DATA', event => {
    if (event.from.connectionId !== session.connection.connectionId) {
      emmitPlayer2Updated(JSON.parse(event.data))
    }
  })

  /**
   * Publishing
   */
  const publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError)

  /**
   * Connect to a session
   */
  session.connect(token, function (error) {
    if (error) {
      handleError(error)
    } else {
      session.publish(publisher, handleError)

      session.signal(
        {
          type: ChannelEvents.join,
          data: JSON.stringify({
            event: ChannelEvents.join
          })
        },
        handleError
      )
    }
  })
}

function signalPlayerData (data) {
  session.signal(
    {
      type: ChannelEvents.playerData,
      data: JSON.stringify(data)
    }
  )
}

export default channel
