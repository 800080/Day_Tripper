module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log('socket.rooms ---->', socket.rooms)
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('room', async room => {
      await socket.join(room)
      console.log('socketAfterJoinRoom ---->', socket.rooms)
    })

    socket.on('leaveRoom', room => {
      socket.leave(room, () => {
        console.log('Left room ', room)
      })
    })

    socket.on('new-message', message => {
      // socket.to(message.tripId.toString()).emit('new-message', message)
      io.in(message.tripId.toString()).emit('new-message', message)
    })

    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
