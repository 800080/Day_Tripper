import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux'

class Map extends React.Component {
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
  // initialCoordinate: state.trips.singleTrip.mapLocation.coordinate
  events: state.events.allEvents
})

export default connect(mapState)(Map)

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
