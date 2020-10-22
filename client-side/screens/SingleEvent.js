import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { List, Divider } from 'react-native-paper'
import Modal from 'react-native-modal';
import { connect } from 'react-redux'
import { setCoords, deleteEvent } from '../store'
import defaultStyles from './styles'

class SingleEvent extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount = () => {
    console.log("IN CDM!!!!")
    this.props.setCoords(this.props.event.mapLocation.coordinate)
  }

  toggleModal = () => this.setState({ isVisible: !this.state.isVisible });

  delete = async () => {
    await this.props.deleteEvent(this.props.event.id)
    this.props.navigation.navigate('Itinerary')
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
      <View style={defaultStyles.singleContainer}>
        <List.Section style={styles.list}>
          <Text style={{ ...defaultStyles.text, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>{this.props.event.title}</Text>
          <Divider style={defaultStyles.divider} />
          <Text style={defaultStyles.text}>Start Time: {startTime.toLocaleString('en-US')}</Text>
          <Divider style={defaultStyles.divider} />
          <Text style={defaultStyles.text}>End Time: {endTime.toLocaleString('en-US')}</Text>
          <Divider style={defaultStyles.divider} />
          <Text style={defaultStyles.text}>Notes: {this.props.event.notes}</Text>
        </List.Section>
        <MapView
          initialRegion={this.props.event.mapLocation.coordinate}
          style={defaultStyles.mapStyle}
        >
          <Marker
            coordinate={this.props.event.mapLocation.coordinate}
            title={this.props.event.title}
            description={this.props.event.notes}
          />
        </MapView>

        {
          this.props.singleTrip.userTrips[0].isHost &&
          <TouchableOpacity
            style={defaultStyles.button}
            onPress={this.toggleModal}
          >
            <Text style={defaultStyles.buttonTitle}>Delete Event</Text>
          </TouchableOpacity>
        }

        <Modal
          style={styles.modal}
          isVisible={this.state.isVisible}
          onBackdropPress={this.toggleModal}
        >
          <View>
            <Text style={styles.text}>Are you sure?</Text>
            <TouchableOpacity
              style={defaultStyles.button}
              onPress={this.delete}
            >
              <Text style={defaultStyles.buttonTitle}>Delete Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={defaultStyles.button}
              onPress={this.toggleModal}
            >
              <Text style={defaultStyles.buttonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapState = (state) => ({
  event: state.events.singleEvent,
  mapCoords: state.map,
  singleTrip: state.trips.singleTrip,
})
const mapDispatch = (dispatch) => ({
  setCoords: (coords) => dispatch(setCoords(coords)),
  deleteEvent: (evtId) => dispatch(deleteEvent(evtId))
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
    textAlign: 'center',
  },
  modal: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    maxHeight: 250,
    marginTop: '50%'
  }
})
