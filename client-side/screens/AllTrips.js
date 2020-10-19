import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllTrips, fetchSingleTrip } from '../store';
import { List } from 'react-native-paper'

class AllTrips extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllTrips(this.props.user.id);
  }

  handleClick = (tripId) => {
    this.props.fetchSingleTrip(tripId);
    this.props.navigation.navigate('SingleTrip'); // Maybe refactor?
  }

  render() {
    const upcomingTrips = this.props.trips.filter(trip => trip.userTrips[0].status === 'accepted')
    const pendingTrips = this.props.trips.filter(trip => trip.userTrips[0].status === 'pending')
    return (
      <ScrollView>
        <List.Section>
          <List.Subheader style={styles.listSubheader}>Upcoming Trips</List.Subheader>
          {
            upcomingTrips.map((trip) => {
              return <List.Item
                key={trip.id}
                title={trip.title}
                description={trip.notes}
                left={() => <List.Icon color="#800080" icon="airplane-takeoff" />}
                onPress={() => this.handleClick(trip.id)}
              />
            })
          }
        </List.Section>
        <List.Section>
          <List.Subheader style={styles.listSubheader}>Pending Trips</List.Subheader>
          {
            pendingTrips.map((trip) => {
              return <List.Item
                key={trip.id}
                title={trip.title}
                description={trip.notes}
                left={() => <List.Icon color="#800080" icon="alert-outline" />}
                onPress={() => this.handleClick(trip.id)}
              />
            })
          }
        </List.Section>
        <List.Section>
          <List.Subheader style={styles.listSubheader} onPress={() => this.props.navigation.navigate('CreateTrip')}>Create Trip</List.Subheader>
        </List.Section>
      </ScrollView>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  trips: state.trips.allTrips,
});

const mapDispatch = (dispatch) => ({
  fetchAllTrips: (userId) => dispatch(fetchAllTrips(userId)),
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId)),
});

export default connect(mapState, mapDispatch)(AllTrips);

const styles = StyleSheet.create({
  listSubheader: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#800080',
    alignSelf: "flex-start",
    marginLeft: 20,
  }
})
