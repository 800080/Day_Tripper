import React, { Component } from 'react'
import { Text, View } from 'react-native'
import io from 'socket.io-client'
import socket from '../socket'

export default class Chat extends Component {

  componentDidMount() {
    socket.emit('room', 'vacationTrip123')
  }

  componentWillUnmount() {
    socket.emit('leaveRoom', 'vacationTrip123')
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
