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
import { updateEvent } from '../store';

class UpdateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.singleEvent,
      show: false,
      date: new Date(),
      time: new Date(),
      mode: '',
      selected: new Date()
    };
  }

  onUpdateEvent = async () => {
    const { title, location } = this.state

    if(!title.length){
      alert('Title required')
    } else if (!location.length) {
      alert('Location required')
    } else {
      await this.props.updateEvent(this.state, this.props.singleEvent.id);
    }
    if (this.props.singleEvent.id)  {
      this.props.navigation.navigate('Event Details');
    }
  };

  onChange = (selectedValue) => {
    const current = this.state.selected === this.state.startTime ? 'start' : 'end'
    if (this.state.mode == 'date') {
      const currentDate = selectedValue;
      this.setState({date: currentDate});
      this.formatDate(currentDate, this.state.selected, current)
    } else {
      const selectedTime = selectedValue;
      this.setState({time: selectedTime});
      this.formatDate(this.state.selected, selectedTime, current)
    }
    this.setState({show: false})
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
    console.log('this.state ---->', this.state)
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
          {/* <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        /> */}
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#aaaaaa"
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Location"
            onChangeText={(location) => this.setState({ location })}
            value={this.state.location}
            autoCapitalize="none"
          />
          <View style={styles.dateTimeButtonView}>
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
          <View style={styles.dateTimeButtonView}>
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
            isVisible= {this.state.show}
            date={this.state.selected}
            mode={this.state.mode}
            display="default"
            onConfirm={this.onChange}
            onCancel={this.hideDatePicker}
          />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            placeholderTextColor="#aaaaaa"
            onChangeText={(notes) => this.setState({ notes })}
            value={this.state.notes}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onUpdateEvent()}
          >
            <Text style={styles.buttonTitle}>Update Event</Text>
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
  updateEvent: (eventInfo, evtId) => dispatch(updateEvent(eventInfo, evtId)),
  clearSingleEvent: () => dispatch(clearSingleEvent())
});

export default connect(mapState, mapDispatch)(UpdateEvent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimeButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    paddingRight: 16
  },
});
