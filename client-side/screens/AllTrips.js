import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux'
import { fetchAllTrips, fetchSingleTrip } from '../store'

class AllTrips extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchAllTrips(this.props.user.id)
  }

  handleClick(tripId) {
    this.props.navigation.navigate('SingleTrip')
    this.props.fetchSingleTrip(tripId)
  }

  render() {
    console.log("TRIPS---", this.props.trips)
    return (
      <View>
        {
          this.props.trips.map((trip) => {
            return <Text key={trip.id} onPress={() => this.handleClick(trip.id)}>{trip.title}</Text>
          })
        }
      </View >
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  trips: state.trips.allTrips
})

const mapDispatch = (dispatch) => ({
  fetchAllTrips: (userId) => dispatch(fetchAllTrips(userId)),
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId))
})

export default connect(mapState, mapDispatch)(AllTrips)
