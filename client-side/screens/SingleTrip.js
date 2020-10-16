import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { fetchSingleTrip } from '../store'
import { List } from 'react-native-paper'

export class SingleTrip extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View>
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
  singleTrip: state.trips.singleTrip //may need editing based on naming convention
})

const mapDispatch = (dispatch) => ({
  fetchSingleTrip: (tripId) => dispatch(fetchSingleTrip(tripId)),
})

export default connect(mapState, mapDispatch)(SingleTrip)

