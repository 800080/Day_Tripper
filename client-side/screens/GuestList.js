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
import defaultStyles from './styles'

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
          <List.Subheader style={defaultStyles.listSubheader}>Going</List.Subheader>
          {goingGuests.map((guest) => {
            return (
              <List.Item
                key={guest.id}
                title={guest.name}
                left={() => (
                  <List.Icon color={defaultStyles.button.backgroundColor} icon="airplane-takeoff" />
                )}
              />
            );
          })}
        </List.Section>
        <List.Section>
          <List.Subheader style={defaultStyles.listSubheader}>Pending</List.Subheader>
          {pendingGuests.map((guest) => {
            return (
              <List.Item
                key={guest.id}
                title={guest.name}
                left={() => <List.Icon color={defaultStyles.button.backgroundColor} icon="alert-outline" />}
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
            style={defaultStyles.input}
            placeholder="Guest's Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(email) => setEmail(email)}
            value={email}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={defaultStyles.button}
            onPress={() => onAddGuest()}
          >
            <Text style={defaultStyles.buttonTitle}>Add Guest</Text>
          </TouchableOpacity>
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
      <FAB
        style={defaultStyles.fab}
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

  scrollView: {
    height: '100%',
  },
  modal: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    maxHeight: 250,
    marginTop: '50%'
  }
});
