import React, { Component } from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { fetchMessages, sendMessage } from '../store/messages';
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'native-base';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
    };
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.tripId);
    socket.emit('room', this.props.tripId);
  }
  componentWillUnmount() {
    socket.emit('leaveRoom', this.props.tripId);
  }

  handlesubmit() {
    this.props.sendMessage(this.state.newMessage, this.props.tripId, this.props.user.id);
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
        onInputTextChanged={newMessage => this.setState({ newMessage })}
        onSend={this.handlesubmit}
        user={{ _id: +this.props.user.id }}
        renderUsernameOnMessage={true}
      />
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  messages: state.messages,
  tripId: state.trips.singleTrip.id
});

const mapDispatch = (dispatch) => ({
  fetchMessages: (tripId) => dispatch(fetchMessages(tripId)),
  sendMessage: (message, tripId, userId) =>
    dispatch(sendMessage(message, tripId, userId)),
});

export default connect(mapState, mapDispatch)(Chat);
