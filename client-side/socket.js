import io from 'socket.io-client'

const socket = io("https://daytripper800080.herokuapp.com")

socket.on('connect', () => {
  console.log('Connected!!!!!!!!!!!!!!!!!!!!!!')
})

export default socket
