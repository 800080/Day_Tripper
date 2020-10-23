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
import { updateTrip } from '../store';
import { List } from 'react-native-paper'
import defaultStyles from './styles'

class UpdateTrip extends Component {
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
    const { title, location, startDate, endDate, notes } = this.props.singleTrip
    const start = new Date(startDate)
    const end = new Date(endDate)
    this.setState({
      title, location, startDate: start, endDate: end, notes
    })
  }

  onUpdateTrip = async () => {
    const { title, location } = this.state

    if(!title.length){
      alert('Title required')
    } else if (!location.length) {
      alert('Location required')
    } else {
      await this.props.updateTrip(this.state);
      this.props.navigation.navigate('SingleTrip')
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
          <TouchableOpacity
            style={defaultStyles.button}
            onPress={() => this.onUpdateTrip()}
          >
            <Text style={defaultStyles.buttonTitle}>Update Trip</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapState = (state) => ({
  singleTrip: state.trips.singleTrip
});

const mapDispatch = (dispatch) => ({
  updateTrip: (tripInfo) =>
    dispatch(updateTrip(tripInfo)),
});

export default connect(mapState, mapDispatch)(UpdateTrip);
