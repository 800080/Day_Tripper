import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllTrips, fetchSingleTrip, setCoords } from '../store';
import { List, FAB, Divider } from 'react-native-paper';
import defaultStyles from './styles'

class AllTrips extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.props.fetchAllTrips(this.props.user.id);
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
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
      <View style={defaultStyles.mainView}>
        <ScrollView>
          <List.Section>
            <List.Subheader style={defaultStyles.listSubheader}>
              Upcoming Trips
            </List.Subheader>
            <Divider style={defaultStyles.divider} />
            {upcomingTrips.map((trip) => {
              return (
                <List.Item
                  key={trip.id}
                  title={trip.title}
                  description={trip.notes}
                  left={() => (
                    <List.Icon color={defaultStyles.button.backgroundColor} icon="airplane-takeoff" />
                  )}
                  onPress={() => this.handleClick(trip.id)}
                />
              );
            })}
          </List.Section>
          <List.Section>
            <List.Subheader style={defaultStyles.listSubheader}>
              Pending Trips
            </List.Subheader>
            <Divider style={defaultStyles.divider} />
            {pendingTrips.map((trip) => {
              return (
                <List.Item
                  key={trip.id}
                  title={trip.title}
                  description={trip.notes}
                  left={() => (
                    <List.Icon color={defaultStyles.button.backgroundColor} icon="alert-outline" />
                  )}
                  onPress={() => this.handleClick(trip.id)}
                />
              );
            })}
          </List.Section>
        </ScrollView>
        <FAB
          style={defaultStyles.fab}
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
