import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { connect } from 'react-redux';
import { createEvent, clearSingleEvent } from '../store';
import defaultStyle from './styles'

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      startTime: new Date(),
      endTime: new Date(),
      notes: '',
      tripId: this.props.tripId,
      show: false,
      date: new Date(),
      time: new Date(),
      mode: '',
      selected: new Date()
    };
  }

  componentDidMount() {
    this.props.clearSingleEvent()
  }

  onCreateEvent = async () => {
    const { title, location } = this.state

    if (!title.length) {
      alert('Title required')
    } else if (!location.length) {
      alert('Location required')
    } else {
      await this.props.createEvent(this.state);
    }
    if (this.props.singleEvent.id) {
      this.props.navigation.navigate('Itinerary');
    }
  };

  onChange = (selectedValue) => {
    const current = this.state.selected === this.state.startTime ? 'start' : 'end'
    if (this.state.mode == 'date') {
      const currentDate = selectedValue;
      this.setState({ date: currentDate });
      this.formatDate(currentDate, this.state.selected, current)
    } else {
      const selectedTime = selectedValue;
      this.setState({ time: selectedTime });
      this.formatDate(this.state.selected, selectedTime, current)
    }
    this.setState({ show: false })
  };

  showDatePicker = (selected) => {
    this.setState({ show: true });
    this.setState({ mode: 'date' });
    this.setState({ selected })
  };

  showTimePicker = (selected) => {
    this.setState({ show: true });
    this.setState({ mode: 'time' });
    this.setState({ selected })
  };

  hideDatePicker = () => {
    this.setState({ show: false })
  }

  formatDate = (date, time, startOrEnd) => {
    const formated = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    const formatedDate = new Date(formated)
    if (startOrEnd === 'start') {
      this.setState({ startTime: formatedDate });
    } else {
      this.setState({ endTime: formatedDate });
    }
  };

  render() {
    return (
      <View style={defaultStyle.singleContainer}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
          <TextInput
            style={defaultStyle.input}
            placeholder="Title"
            placeholderTextColor="#aaaaaa"
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            autoCapitalize="words"
          />
          <TextInput
            style={defaultStyle.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Location"
            onChangeText={(location) => this.setState({ location })}
            value={this.state.location}
            autoCapitalize="none"
          />
          <View style={defaultStyle.dateTimeButtonView}>
            <Text>Start:</Text>
            <Button
              onPress={() => this.showDatePicker(this.state.startTime)}
              title={moment(this.state.startTime).format("MMM D, YYYY")}
            />
            <Button
              onPress={() => this.showTimePicker(this.state.startTime)}
              title={moment(this.state.startTime).format("h:mm a")}
            />
          </View>
          <View style={defaultStyle.dateTimeButtonView}>
            <Text>End:</Text>
            <Button
              onPress={() => this.showDatePicker(this.state.endTime)}
              title={moment(this.state.endTime).format("MMM D, YYYY")}
            />
            <Button
              onPress={() => this.showTimePicker(this.state.endTime)}
              title={moment(this.state.endTime).format("h:mm a")}
            />
          </View>
          <DateTimePickerModal
            isVisible={this.state.show}
            date={this.state.selected}
            mode={this.state.mode}
            display="default"
            onConfirm={this.onChange}
            onCancel={this.hideDatePicker}
          />
          <TextInput
            style={defaultStyle.input}
            placeholder="Notes"
            placeholderTextColor="#aaaaaa"
            onChangeText={(notes) => this.setState({ notes })}
            value={this.state.notes}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={defaultStyle.button}
            onPress={() => this.onCreateEvent()}
          >
            <Text style={defaultStyle.buttonTitle}>Create Event</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapState = (state) => ({
  tripId: state.trips.singleTrip.id,
  singleEvent: state.events.singleEvent
});

const mapDispatch = (dispatch) => ({
  createEvent: (eventInfo) => dispatch(createEvent(eventInfo)),
  clearSingleEvent: () => dispatch(clearSingleEvent())
});

export default connect(mapState, mapDispatch)(CreateEvent);

