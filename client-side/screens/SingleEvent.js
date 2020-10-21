import React, { Component } from 'react'
import { Text, View, ScrollView , StyleSheet, Dimensions} from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { List } from 'react-native-paper'
import { connect } from 'react-redux'
import { setCoords } from '../store'

class SingleEvent extends Component {
  constructor() {
    super()
  }

  componentDidMount = () => {
    console.log("IN CDM!!!!")
    this.props.setCoords(this.props.event.mapLocation.coordinate)
  }

  onClick = () => {
    this.props.setCoords(this.props.event.mapLocation.coordinate)
    this.props.navigation.navigate('Map')
  }

  render() {
    const startTime = new Date(this.props.event.startTime)
    const endTime = new Date(this.props.event.endTime)
    console.log("COORDS_--------", this.props.mapCoords)
    return (
      <View style={styles.container}>
        <List.Section style={styles.list}>
          <Text style={styles.text}>{this.props.event.title}</Text>
          <Text style={styles.text}>Start Time: {startTime.toLocaleString('en-US')}</Text>
          <Text style={styles.text}>End Time: {endTime.toLocaleString('en-US')}</Text>
          <Text
            onPress={this.onClick}
            style={styles.text}>See MAP</Text>
          <Text style={styles.text}>Notes: {this.props.event.notes}</Text>
        </List.Section>
        <MapView
          initialRegion={this.props.event.mapLocation.coordinate}
          style={styles.mapStyle}
        >
          <Marker
            coordinate={this.props.event.mapLocation.coordinate}
            title={this.props.event.title}
            description={this.props.event.notes}
          />
        </MapView>
      </View>
    )
  }
}

const mapState = (state) => ({
  event: state.events.singleEvent,
  mapCoords: state.map
})
const mapDispatch = (dispatch) => ({
  setCoords: (coords) => dispatch(setCoords(coords))
})

export default connect(mapState, mapDispatch)(SingleEvent)


const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  list: {
    color: 'white',
    // alignSelf: "flex-start",
    // marginLeft: 20
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  mapStyle: {
    width: '60%',
    height: '30%',
    borderWidth: 1,
    borderRadius: 7
  }
})
