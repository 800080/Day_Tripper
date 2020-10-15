import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchAllEvents, getSingleEvent } from '../store'

class Itinerary extends Component {
  constructor() {
    super()
  }
  componentDidMount(){
    this.props.fetchEvents(this.props.trip.id)
  }

  render() {
    const itinEvents = this.props.events
    return (
      <ScrollView>
        <List.Section>
          {
            itinEvents.map((event) => {
              return <List.Item
              key={event.id}
              title={event.title}
              description={event.notes}
              left={() => <List.Icon color="#800080" icon="airplane-takeoff" />}
              // onPress={() => this.handleClick(trip.id)}
            />
            })
          }
        </List.Section>
      </ScrollView>
      )
  }
}

const mapState = (state) => ({
  events: state.events.allEvents,
  trip: state.trips.singleTrip
})
const mapDispatch = (dispatch) => ({
  fetchEvents: (tripId) => dispatch(fetchAllEvents(tripId)),
  fetchSingleEvent: (event) => dispatch(getSingleEvent(event))
})
export default connect(mapState, mapDispatch)(Itinerary)
