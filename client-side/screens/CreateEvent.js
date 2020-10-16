import React, { Component } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { connect } from 'react-redux';
import { createEvent } from '../store'

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      startTime: new Date(),
      endTime: '',
      notes: '',
      tripId: this.props.tripId,
      showTime: false
    }
  }

  onCreateEvent = () => {
    this.props.createEvent(this.state)
    this.props.navigation.navigate("Itinerary")
  };

  showTimePicker = () => {
    this.setState({showTime: true})
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.startTime;
    this.setState({startTime: currentDate});
    this.setState({showTime: false})
  };

  render(){
    return(
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
        <Button
          onPress={this.showTimePicker}
          title={moment(this.state.startTime).format("MMMM Do YYYY, h:mm a")}
        />
        {this.state.showTime && (
        <DateTimePicker
          value={this.state.startTime}
          mode='datetime'
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />)}
        {/* <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Start Time"
          onChangeText={(startTime) => this.setState({ startTime })}
          value={this.state.startTime}
          autoCapitalize="none"
        /> */}
        <TextInput
          style={styles.input}
          placeholder="End Time"
          placeholderTextColor="#aaaaaa"
          onChangeText={(endTime) => this.setState({ endTime })}
          value={this.state.endTime}
          autoCapitalize="none"
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
          onPress={() => this.onCreateEvent()}
        >
          <Text style={styles.buttonTitle}>Create Event</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapState = (state) => ({
  tripId: state.trips.singleTrip.id
})

const mapDispatch = (dispatch) => ({
  createEvent: (eventInfo) => dispatch(createEvent(eventInfo))
})

export default connect(mapState, mapDispatch)(CreateEvent)


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
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
