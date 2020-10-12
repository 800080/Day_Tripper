import React, { Component } from 'react'
import { Text, View } from 'react-native'
import io from 'socket.io-client'

export default class Chat extends Component {

  componentDidMount() {
    const socket = io('http://10.0.2.2:7070', {
      transports: ['websocket'], jsonp: false
    });
    socket.connect();
    socket.on('connect', () => {
      console.log('connected to socket server');
    });
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
