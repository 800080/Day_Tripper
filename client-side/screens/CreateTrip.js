import React, { Component } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { createTripServer } from '../store'

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      notes: '',
      guests: [],
    };
  }

  onCreateTrip = () => {
    this.props.createTrip(this.state, this.props.navigation)
  };

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
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Start Date"
            onChangeText={(startDate) => this.setState({ startDate })}
            value={this.state.startDate}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="End Date"
            placeholderTextColor="#aaaaaa"
            onChangeText={(endDate) => this.setState({ endDate })}
            value={this.state.endDate}
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
          <TextInput
            style={styles.input}
            placeholder="Guests"
            placeholderTextColor="#aaaaaa"
            onChangeText={(guests) => this.setState({ guests })}
            value={this.state.guests}
            autoCapitalize="none"
          />
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

const mapDispatch = (dispatch) => ({
  createTrip: (tripInfo, navigation) =>
    dispatch(createTripServer(tripInfo, navigation)),
});

export default connect(null, mapDispatch)(CreateTrip);

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
