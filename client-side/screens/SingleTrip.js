import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchSingleTrip } from '../store'

export class SingleTrip extends Component {
  constructor() {
    super()
  }

  render() {
    console.log("THE PROPPPSSS: ", this.props.singleTrip.title)
    return (
      <View>
        <Text>{this.props.singleTrip.title}</Text>
        <Text>START: {this.props.singleTrip.startDate}</Text>
        <Text>END: {this.props.singleTrip.endDate}</Text>
        <Text>NOTES: {this.props.singleTrip.notes}</Text>
        <Text>Guest list</Text>
        <Text>Itenerary</Text>
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
