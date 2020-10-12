import io from 'socket.io-client'

const socket = io("http://192.168.0.9:7070")

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
