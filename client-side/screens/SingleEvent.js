import React, { Component } from 'react'
import { Text, View, ScrollView , StyleSheet} from 'react-native'
import { List } from 'react-native-paper'
import { connect } from 'react-redux'
import { setCoords } from '../store'

class SingleEvent extends Component {
  constructor() {
    super()
  }

  onClick = () => {
    this.props.setCoords(this.props.event.mapLocation.coordinate)
    this.props.navigation.navigate('Map')
  }

  render() {
    const startTime = new Date(this.props.event.startTime)
    const endTime = new Date(this.props.event.endTime)
    return (
      <List.Section style={styles.list}>
        <Text style={styles.text}>{this.props.event.title}</Text>
        <Text style={styles.text}>Start Time: {startTime.toLocaleString('en-US')}</Text>
        <Text style={styles.text}>End Time: {endTime.toLocaleString('en-US')}</Text>
        <Text
          onPress={this.onClick}
          style={styles.text}>See MAP</Text>
        <Text style={styles.text}>Notes: {this.props.event.notes}</Text>
      </List.Section>
    )
  }
}

const mapState = (state) => ({
  event: state.events.singleEvent
})
const mapDispatch = (dispatch) => ({
  setCoords: (coords) => dispatch(setCoords(coords))
})

export default connect(mapState, mapDispatch)(SingleEvent)


const styles = StyleSheet.create({
  list: {
    color: 'white',
    alignSelf: "flex-start",
    marginLeft: 20
  },
  text: {
    fontSize: 20,
    padding: 10,
  }
})
