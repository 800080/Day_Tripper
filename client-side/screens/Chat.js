import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import socket from '../socket';
import { connect } from 'react-redux';
import { fetchMessages, sendMessage } from '../store/messages';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ''
    }
    this.handlesubmit = this.handlesubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchMessages('1');
    socket.emit('room', '1'); //NOTE - hardcoding tripId
  }
  componentWillUnmount() {
    socket.emit('leaveRoom', '1');
  }

  handlesubmit() {
    this.props.sendMessage(this.state.newMessage, '1', '3')
    this.setState({newMessage: ''})
  }

  render() {
    return (
      <View>
        {this.props.messages.map((message) => {
          return <Text key={message.id}>{message.message}</Text>;
        })}
        <TextInput style={{ height: 40, borderWidth: 2, marginTop: 20 }} onChangeText={newMessage => this.setState({newMessage})} value={this.state.newMessage} />
        <Button
          title="Send"
          onPress={() => this.handlesubmit()}
        />
      </View>
    );
  }
}

const mapState = (state) => ({
  messages: state.messages,
});

const mapDispatch = (dispatch) => ({
  fetchMessages: (tripId) => dispatch(fetchMessages(tripId)),
  sendMessage: (message, tripId, userId) =>
    dispatch(sendMessage(message, tripId, userId)),
});

export default connect(mapState, mapDispatch)(Chat);
