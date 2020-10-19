import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchSingleTrip, fetchAllTrips, updateStatus } from '../store'
import { List } from 'react-native-paper'

export class SingleTrip extends Component {
  constructor() {
    super()
  }

  acceptInvite = () => {
    this.props.updateStatus(this.props.singleTrip.id, this.props.user.id, "accepted")
    this.props.fetchAllTrips(this.props.user.id);
  }
  declineInvite = () => {
    this.props.updateStatus(this.props.singleTrip.id, this.props.user.id, "rejected")
    this.props.navigation.navigate("AllTrips")
    this.props.fetchAllTrips(this.props.user.id);
  }

  render() {
    return (
      <View>
        {
          this.props.singleTrip.userTrips && this.props.singleTrip.userTrips[0].status === "pending" ?
            <View>
              <Button
                title="Accept"
                onPress={() => this.acceptInvite()}>
              </Button>
              <Button
                title="Decline"
                onPress={() => this.declineInvite()}>
              </Button>
            </View>
            : true
        }

        <List.Section style={styles.list}>
          <Text style={styles.text}>{this.props.singleTrip.title}</Text>
          <Text style={styles.text}>Start: {this.props.singleTrip.startDate}</Text>
          <Text style={styles.text}>End: {this.props.singleTrip.endDate}</Text>
          <Text style={styles.text}>Notes: {this.props.singleTrip.notes}</Text>
        </List.Section>
        <Button
          title="Go to Guest List"
          onPress={() => this.props.navigation.navigate('Guest List')}
        />
        <Button
          title="Go to Itinerary"
          onPress={() => this.props.navigation.navigate('Itinerary')}
        />
        <Button
          title="See Map of Events"
          onPress={() => this.props.navigation.navigate('Map', {initialCoordinate: this.props.singleTrip.mapLocation.coordinate})}
        />
        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat')}
        />
        <Button
          title="Back to All Trips"
          onPress={() => this.props.navigation.navigate('AllTrips')}
        />
      </View >
    )
  }
}

const mapState = (state) => ({
  singleTrip: state.trips.singleTrip,
  user: state.user
})

const mapDispatch = (dispatch) => ({
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId)),
  updateStatus: (tripId, userId, status) => dispatch(updateStatus(tripId, userId, status)),
  fetchAllTrips: (userId) => dispatch(fetchAllTrips(userId)),
})

export default connect(mapState, mapDispatch)(SingleTrip)

const styles = StyleSheet.create({
  list: {
    color: 'white',
    alignSelf: "flex-start",
    marginLeft: 20
  },
  text: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  }
})
