import io from 'socket.io-client'
import store, { getNewMessage } from './store'

const socket = io("https://daytripper800080.herokuapp.com")
// const socket = io("http://localhost:7070")

socket.on('connect', () => {
  console.log('Connected!!!!!!!!!!!!!!!!!!!!!!')
})

socket.on('new-message', message => {
  store.dispatch(getNewMessage(message))
})

export default socket