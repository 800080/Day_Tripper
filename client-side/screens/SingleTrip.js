import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
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
        <Text>{this.props.singleTrip.title}</Text>
        <Text>START: {this.props.singleTrip.startDate}</Text>
        <Text>END: {this.props.singleTrip.endDate}</Text>
        <Text>NOTES: {this.props.singleTrip.notes}</Text>
        <Text onPress={() => this.props.navigation.navigate('Guest List')}>Guest list</Text>
        <Text onPress={() => this.props.navigation.navigate('Itinerary')}>Itinerary</Text>
        <Text onPress={() => this.props.navigation.navigate('Chat')}>CHAT</Text>
        <Text>MAP</Text>
        <Button
        title="Go to Chat"
        onPress={() => this.props.navigation.navigate('Chat')}
      />
      </View>

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

