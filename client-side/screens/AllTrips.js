import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllTrips, fetchSingleTrip, setCoords } from '../store';
import { List, FAB } from 'react-native-paper';

class AllTrips extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllTrips(this.props.user.id);
  }

  handleClick = async (tripId) => {
    await this.props.fetchSingleTrip(tripId);
    await this.props.setCoords(this.props.singleTrip.mapLocation.coordinate);
    this.props.navigation.navigate('SingleTrip'); // Maybe refactor?
  };

  render() {
    const upcomingTrips = this.props.trips.filter(
      (trip) => trip.userTrips[0].status === 'accepted'
    );
    const pendingTrips = this.props.trips.filter(
      (trip) => trip.userTrips[0].status === 'pending'
    );
    return (
      <View style={styles.scrollView}>
        <ScrollView>
          <List.Section>
            <List.Subheader style={styles.listSubheader}>
              Upcoming Trips
            </List.Subheader>
            {upcomingTrips.map((trip) => {
              return (
                <List.Item
                  key={trip.id}
                  title={trip.title}
                  description={trip.notes}
                  left={() => (
                    <List.Icon color="#800080" icon="airplane-takeoff" />
                  )}
                  onPress={() => this.handleClick(trip.id)}
                />
              );
            })}
          </List.Section>
          <List.Section>
            <List.Subheader style={styles.listSubheader}>
              Pending Trips
            </List.Subheader>
            {pendingTrips.map((trip) => {
              return (
                <List.Item
                  key={trip.id}
                  title={trip.title}
                  description={trip.notes}
                  left={() => (
                    <List.Icon color="#800080" icon="alert-outline" />
                  )}
                  onPress={() => this.handleClick(trip.id)}
                />
              );
            })}
          </List.Section>
        </ScrollView>
        <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => this.props.navigation.navigate('CreateTrip')}
        />
      </View>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  trips: state.trips.allTrips,
  singleTrip: state.trips.singleTrip,
});

const mapDispatch = (dispatch) => ({
  fetchAllTrips: (userId) => dispatch(fetchAllTrips(userId)),
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId)),
  setCoords: (coords) => dispatch(setCoords(coords))
});

export default connect(mapState, mapDispatch)(AllTrips);

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  listSubheader: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#800080',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
});
