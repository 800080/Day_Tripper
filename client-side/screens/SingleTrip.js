import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

export class SingleTrip extends Component {
  constructor(props) {
    super(props)
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
  singleTrip: state.singleTrip //may need editing based on naming convention
})

export default connect(mapState)(SingleTrip)
