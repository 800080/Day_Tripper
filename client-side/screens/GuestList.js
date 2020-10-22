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

import { fetchGuests, findAddGuest, removeGuest } from '../store';

import defaultStyles from './styles'

function GuestList(props) {
  const [email, setEmail] = useState('');
  const [isVisible, setVisibility] = useState(false);
  const [isVisibleRemove, setVisibilityRemove] = useState(false);
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    props.fetchGuests(props.singleTrip.id);
  }, []);

  const onAddGuest = () => {
    props.addsGuest(email, props.singleTrip.id);
    setEmail('');
  };

  const toggleModal = () => setVisibility(!isVisible)
  const toggleModalRemove = () => setVisibilityRemove(!isVisibleRemove)

  const goingGuests = props.guestList.filter(
    (guest) => guest.userTrips[0].status === 'accepted'
  );
  const pendingGuests = props.guestList.filter(
    (guest) => guest.userTrips[0].status === 'pending'
  );

  return (
    <View
      style={{ backgroundColor: defaultStyles.singleContainer.backgroundColor, flex: 1, width: '100%', height: '100%' }}
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
                right={() => {
                  if (props.singleTrip.userTrips[0].isHost){
                    return  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => {
                      setGuestId(guest.id)
                      toggleModalRemove()
                    }}
                  >
                    <Text style={styles.buttonTitle}>x</Text>
                  </TouchableOpacity>
                  }}
                }
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
                right={() => {
                  if (props.singleTrip.userTrips[0].isHost){
                    return  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => {
                      setGuestId(guest.id)
                      toggleModalRemove()
                    }}
                  >
                    <Text style={styles.buttonTitle}>x</Text>
                  </TouchableOpacity>
                  }}
                }
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
          <Button title="Cancel" onPress={() => toggleModal()} />
        </View>
      </Modal>

      <Modal
          style={styles.modal}
          isVisible={isVisibleRemove}
          onBackdropPress={toggleModalRemove}
        >
          <View>
            <Text style={styles.text}>Are you sure?</Text>
            <TouchableOpacity
              style={defaultStyles.button}
              onPress={() => {
                props.removeGuest(props.singleTrip.id, guestId)
                toggleModalRemove()
              }}
            >
              <Text style={defaultStyles.buttonTitle}>Remove Guest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={defaultStyles.button}
              onPress={() => toggleModalRemove()}
            >
              <Text style={defaultStyles.buttonTitle}>Cancel</Text>
            </TouchableOpacity>
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
  removeGuest: (tripId, userId) => dispatch(removeGuest(tripId, userId))
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
  },
  text: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  delete: {
    backgroundColor: 'red',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 25,
    width: 25,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
