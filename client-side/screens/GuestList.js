import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { List } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchGuests, findAddGuest } from '../store';

function GuestList(props) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    props.fetchGuests(props.singleTrip.id);
  }, []);

  const onAddGuest = () => {
    props.addsGuest(email, props.singleTrip.id);
    setEmail('');
  };

  const goingGuests = props.guestList.filter(
    (guest) => guest.userTrips[0].status === 'accepted'
  );
  const pendingGuests = props.guestList.filter(
    (guest) => guest.userTrips[0].status === 'pending'
  );

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: '100%' }}
      keyboardShouldPersistTaps="handled"
    >
      <List.Section>
        <List.Subheader style={styles.listSubheader}>Going</List.Subheader>
        {goingGuests.map((guest) => {
          return (
            <List.Item
              key={guest.id}
              title={guest.name}
              left={() => <List.Icon color="#800080" icon="airplane-takeoff" />}
            />
          );
        })}
      </List.Section>
      <List.Section>
        <List.Subheader style={styles.listSubheader}>Pending</List.Subheader>
        {pendingGuests.map((guest) => {
          return (
            <List.Item
              key={guest.id}
              title={guest.name}
              left={() => <List.Icon color="#800080" icon="alert-outline" />}
            />
          );
        })}
      </List.Section>
      <TextInput
        style={styles.input}
        placeholder="Guest's Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={(email) => setEmail(email)}
        value={email}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={() => onAddGuest()}>
        <Text style={styles.buttonTitle}>Add Guest</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const mapState = (state) => ({
  singleTrip: state.trips.singleTrip,
  guestList: state.trips.guestList,
});

const mapDispatch = (dispatch) => ({
  fetchGuests: (tripId) => dispatch(fetchGuests(tripId)),
  addsGuest: (email, tripId) => dispatch(findAddGuest(email, tripId)),
});

export default connect(mapState, mapDispatch)(GuestList);

const styles = StyleSheet.create({
  listSubheader: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#800080',
    alignSelf: 'flex-start',
    marginLeft: 20,
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
});
