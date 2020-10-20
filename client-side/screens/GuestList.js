import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import { List } from 'react-native-paper';
import { fetchGuests, findAddGuest } from '../store';

function GuestList(props) {
  const [email, setEmail] = useState('');
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    props.fetchGuests(props.singleTrip.id);
  }, []);

  const onAddGuest = () => {
    props.addsGuest(email, props.singleTrip.id);
    setEmail('');
  };

  const toggleModal = () => setVisibility(!isVisible)

  const goingGuests = props.guestList.filter(
    (guest) => guest.userTrips[0].status === 'accepted'
  );
  const pendingGuests = props.guestList.filter(
    (guest) => guest.userTrips[0].status === 'pending'
  );

  return (
    <View
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <List.Section>
          <List.Subheader style={styles.listSubheader}>Going</List.Subheader>
          {goingGuests.map((guest) => {
            return (
              <List.Item
                key={guest.id}
                title={guest.name}
                left={() => (
                  <List.Icon color="#800080" icon="airplane-takeoff" />
                )}
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
      </ScrollView>
      <Modal
        style={styles.modal}
        isVisible={isVisible}
        onBackdropPress={toggleModal}
      >
        <View>
          <TextInput
            style={styles.input}
            placeholder="Guest's Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(email) => setEmail(email)}
            value={email}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onAddGuest()}
          >
            <Text style={styles.buttonTitle}>Add Guest</Text>
          </TouchableOpacity>
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={toggleModal}
      />
    </View>
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
  scrollView: {
    height: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
  modal: {
    backgroundColor: '#E8E8E8',
    maxHeight: 250,
    marginTop: '50%'
  }
});
