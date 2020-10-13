import React, { Component } from 'react'
import { Text, View } from 'react-native'
import io from 'socket.io-client'
import socket from '../socket'
import { connect } from 'react-redux'
import { fetchMessages, sendMessage } from '../store/messages'

class Chat extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchMessages('1')
    socket.emit('room', '1')  //NOTE - hardcoding tripId

  }
  component
  WillUnmount() {
    socket.emit('leaveRoom', '1')
  }

  render() {
    console.log("MESSAGES---", this.props)
    return (
      <View>
        {
          this.props.messages.length ?
          this.props.messages.map( (message) => {
            return <Text key={message.id}>{message.message}</Text>
          })
          : <Text> textInComponent </Text>
        }

      </View>
    )
  }
}

const mapState = (state) => ({
  messages: state.messages
})

const mapDispatch = (dispatch) => ({
  fetchMessages: (tripId) => dispatch(fetchMessages(tripId)),
  sendMessage: (message, tripId, userId) => dispatch(sendMessage(message, tripId, userId))
})

export default connect(mapState, mapDispatch)(Chat)
