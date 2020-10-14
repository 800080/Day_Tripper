import io from 'socket.io-client'
import store, { getNewMessage } from './store'
import serverUrl from './serverUrl'

const socket = io(serverUrl)

socket.on('connect', () => {
  console.log('Connected!!!!!!!!!!!!!!!!!!!!!!')
})

socket.on('new-message', message => {
  console.log('received message!!!!!!!!!!!!!!!!!')
  store.dispatch(getNewMessage(message))
})

export default socket
