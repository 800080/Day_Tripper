import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchSingleTrip } from '../store'

export class SingleTrip extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View>
        <Text>Single Trip TITLE</Text>
        <Text>DATE RANGE</Text>
        <Text>NOTES</Text>
        <Text>GUEST LIST</Text>
        <Text>ITINERARY</Text>
        <Text onPress={() => this.props.navigation.navigate('Chat')}>CHAT</Text>
        <Text>MAP</Text>
      </View>
    )
  }
}

const mapState = (state) => ({
  singleTrip: state.trips.singleTrip //may need editing based on naming convention
})

const mapDispatch = (dispatch) => ({
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId))
})

export default connect(mapState, mapDispatch)(SingleTrip)
