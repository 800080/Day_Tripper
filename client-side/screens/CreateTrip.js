import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { connect } from 'react-redux';
import { createTripServer, findAddGuest, clearGuestList, rmvGuest, removeGuest } from '../store';
import { List } from 'react-native-paper'
import defaultStyles from './styles'

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      startDate: new Date(),
      endDate: new Date(),
      notes: '',
      guest: '',
      show: false,
      selected: new Date(),
    };
  }

  componentDidMount() {
    this.props.clearGuestList()
  }

  componentWillUnmount() {
    this.props.clearGuestList()
  }

  onCreateTrip = async () => {
    const { title, location } = this.state

    if(!title.length){
      alert('Title required')
    } else if (!location.length) {
      alert('Location required')
    } else {
    await this.props.createTrip(this.state);
    this.props.navigation.navigate('AllTrips')
    }
  };

  onAddGuest = () => {
    this.props.addsGuest(this.state.guest);
    this.setState({ guest: '' })
  };

  onChange = (currentDate) => {
    if (this.state.selected === this.state.startDate) {
      this.setState({ startDate: currentDate });
    } else {
      this.setState({ endDate: currentDate });
    }
    this.setState({ show: false })
  };

  showDatePicker = (selected) => {
    this.setState({ show: true });
    this.setState({ selected })
  };

  hideDatePicker = () => {
    this.setState({ show: false })
  }

  render() {
    return (
      <View style={defaultStyles.inputContainer}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
          <TextInput
            style={defaultStyles.input}
            placeholder="Title"
            placeholderTextColor="#aaaaaa"
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            autoCapitalize="words"
          />
          <TextInput
            style={defaultStyles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Location"
            onChangeText={(location) => this.setState({ location })}
            value={this.state.location}
            autoCapitalize="none"
          />
          <View style={defaultStyles.dateTimeButtonView}>
            <Text>Start Date:</Text>
            <Button
              onPress={() => this.showDatePicker(this.state.startDate)}
              title={moment(this.state.startDate).format("MMM D, YYYY")}
            />
          </View>
          <View style={defaultStyles.dateTimeButtonView}>
            <Text>End Date:</Text>
            <Button
              onPress={() => this.showDatePicker(this.state.endDate)}
              title={moment(this.state.endDate).format("MMM D, YYYY")}
            />
          </View>
          <DateTimePickerModal
            isVisible={this.state.show}
            date={this.state.selected}
            mode='date'
            display="default"
            onConfirm={this.onChange}
            onCancel={this.hideDatePicker}
          />
          <TextInput
            style={defaultStyles.input}
            placeholder="Notes"
            placeholderTextColor="#aaaaaa"
            onChangeText={(notes) => this.setState({ notes })}
            value={this.state.notes}
            autoCapitalize="none"
          />
          <TextInput
            style={defaultStyles.input}
            placeholder="Guest's Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(guest) => this.setState({ guest })}
            value={this.state.guest}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={defaultStyles.button}
            onPress={() => this.onAddGuest()}
          >
            <Text style={defaultStyles.buttonTitle}>Add Guest</Text>
          </TouchableOpacity>
          {this.props.guestList.map((guest) => {
            return (
              <List.Item
                key={guest.id}
                title={guest.name}
              // left={(props) => <List.Icon {...props} icon="folder" />}
                right={() => (
                  <TouchableOpacity
                    style={defaultStyles.button}
                    onPress={() => {
                      this.props.removeGuest(guest.id)
                    }}
                  >
                    <Text style={defaultStyles.buttonTitle}>x</Text>
                  </TouchableOpacity>
                )}
              />
            );
          })}
          <TouchableOpacity
            style={defaultStyles.button}
            onPress={() => this.onCreateTrip()}
          >
            <Text style={defaultStyles.buttonTitle}>Create Trip</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapState = (state) => ({
  guestList: state.trips.guestList,
});

const mapDispatch = (dispatch) => ({
  createTrip: (tripInfo) =>
    dispatch(createTripServer(tripInfo)),
  addsGuest: (email) => dispatch(findAddGuest(email)),
  clearGuestList: () => dispatch(clearGuestList()),
  removeGuest: (guestId) => dispatch(rmvGuest(guestId))
});

export default connect(mapState, mapDispatch)(CreateTrip);
