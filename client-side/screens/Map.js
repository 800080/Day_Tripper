import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { fetchAllEvents } from '../store'

class Map extends React.Component {
  componentDidMount() {
    this.props.fetchAllEvents(this.props.singleTrip.id)
  }

  render() {
    const initialCoordinate = this.props.route.params.initialCoordinate
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={initialCoordinate}
          style={styles.mapStyle}
        >
          {this.props.events.map((event => {
            return (
              <Marker
                key={event.id}
                coordinate={event.mapLocation.coordinate}
                title={event.title}
                description={event.notes}
              />
            )
          }))}
        </MapView>
      </View>
    );
  }
}

const mapState = (state) => ({
  events: state.events.allEvents,
  singleTrip: state.trips.singleTrip
})

const mapDispatch = (dispatch) => ({
  fetchAllEvents: (tripId) => dispatch(fetchAllEvents(tripId))
})

export default connect(mapState, mapDispatch)(Map)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
