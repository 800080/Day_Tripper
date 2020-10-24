import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux'
import { fetchAllEvents } from '../store'

class Map extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.props.singleTrip.coordinate}
          style={styles.mapStyle}
        >
          <Marker
            coordinate={this.props.singleTrip.coordinate}
            title={this.props.singleTrip.title}
            description={this.props.singleTrip.notes}
          >
           <Image source={require('../assets/house.png')} style={{height: 22, width: 22, tintColor: "#60656F"}}/>
          </Marker>

          {this.props.events.map((event => {
            return (
              <Marker
                key={event.id}
                coordinate={event.coordinate}
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
