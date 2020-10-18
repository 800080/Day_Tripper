import React, { Component } from 'react'
import { Text, View, ScrollView, Button } from 'react-native'
import { List } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchAllEvents, getSingleEvent } from '../store'

class Itinerary extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount(){
    this.props.fetchEvents(this.props.trip.id)
  }

  handleClick(eventId) {
    const singleEvent = this.props.events.filter(event => event.id === eventId)
    this.props.fetchSingleEvent(singleEvent[0])
    this.props.navigation.navigate('Event Details')
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
              onPress={() => this.handleClick(event.id)}
            />
            })
          }
        </List.Section>
        <Button
        title="Create Event"
        onPress={() => this.props.navigation.navigate('Create Event')}
      />
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
