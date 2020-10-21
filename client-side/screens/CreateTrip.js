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
import { createTripServer, findAddGuest, clearGuestList } from '../store';
import { List } from 'react-native-paper'

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

  onCreateTrip = () => {
    const { title, location } = this.state

    if(!title.length){
      alert('Title required')
    } else if (!location.length) {
      alert('Location required')
    } else {
    this.props.createTrip(this.state);
    this.props.navigation.navigate('AllTrips')
    }
  };

  onAddGuest = () => {
    this.props.addsGuest(this.state.guest);
    this.setState({guest: ''})
  };

  onChange = (currentDate) => {
    if (this.state.selected === this.state.startDate) {
      this.setState({startDate: currentDate});
    } else {
      this.setState({endDate: currentDate});
    }
    this.setState({show: false})
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
            <Text>Start Date:</Text>
            <Button
              onPress={() => this.showDatePicker(this.state.startDate)}
              title={moment(this.state.startDate).format("MMM D, YYYY")}
            />
          </View>
          <View style={styles.dateTimeButtonView}>
            <Text>End Date:</Text>
            <Button
              onPress={() => this.showDatePicker(this.state.endDate)}
              title={moment(this.state.endDate).format("MMM D, YYYY")}
            />
          </View>
          <DateTimePickerModal
            isVisible= {this.state.show}
            date={this.state.selected}
            mode='date'
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
          <TextInput
            style={styles.input}
            placeholder="Guest's Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(guest) => this.setState({ guest })}
            value={this.state.guest}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onAddGuest()}
          >
            <Text style={styles.buttonTitle}>Add Guest</Text>
          </TouchableOpacity>
          {this.props.guestList.map((guest) => {
            return (
              <List.Item
              key={guest.id}
                title={guest.name}
                // left={(props) => <List.Icon {...props} icon="folder" />}
              />
            );
          })}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onCreateTrip()}
          >
            <Text style={styles.buttonTitle}>Create Trip</Text>
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
  clearGuestList: () => dispatch(clearGuestList())
});

export default connect(mapState, mapDispatch)(CreateTrip);

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
