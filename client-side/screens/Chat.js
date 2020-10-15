import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import socket from '../socket';
import { connect } from 'react-redux';
import { fetchMessages, sendMessage } from '../store/messages';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
    };
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchMessages('1');
    socket.emit('room', '1'); //NOTE - hardcoding tripId
  }
  componentWillUnmount() {
    socket.emit('leaveRoom', '1');
  }

  handlesubmit() {
    this.props.sendMessage(this.state.newMessage, '1', this.props.user.id);
    this.setState({ newMessage: '' });
  }

  render() {
    let giftedChatMessages = this.props.messages.map((chatMessage) => {
      let gcm = {
        _id: +chatMessage.id,
        text: chatMessage.message,
        createdAt: chatMessage.createdAt,
        user: {
          _id: +chatMessage.user.id,
          name: chatMessage.user.username,
          // avatar: 'https://placeimg.com/140/140/any'
        }
      };
      return gcm;
    });
    return (
        <GiftedChat
          messages={giftedChatMessages}
          onInputTextChanged={newMessage => this.setState({newMessage})}
          onSend={this.handlesubmit}
          user={{ _id: +this.props.user.id }}
        />
      // <View>
      //   {this.props.messages.map((message) => {
      //     return <Text key={message.id}>{message.user.username}: {message.message}</Text>;
      //   })}
      //   <TextInput style={{ height: 40, borderWidth: 2, marginTop: 20 }} onChangeText={newMessage => this.setState({newMessage})} value={this.state.newMessage} />
      //   <Button
      //     title="Send"
      //     onPress={() => this.handlesubmit()}
      //   />
      // </View>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  messages: state.messages,
});

const mapDispatch = (dispatch) => ({
  fetchMessages: (tripId) => dispatch(fetchMessages(tripId)),
  sendMessage: (message, tripId, userId) =>
    dispatch(sendMessage(message, tripId, userId)),
});

export default connect(mapState, mapDispatch)(Chat);
