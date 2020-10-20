import React, { Component } from 'react'
import { View, Button, FlatList } from 'react-native'
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";
import { List } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchAllEvents, getSingleEvent } from '../store'
import moment from 'moment'

class Itinerary extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      stickyHeader: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount = async () => {
    await this.props.fetchEvents(this.props.trip.id)
    const newEvts = this.formatEvents()
    const stickyHeader = this.stickyHeaderArr(newEvts)
    this.setState({data: newEvts, stickyHeader})
  }

  handleClick(eventId) {
    const singleEvent = this.props.events.filter(event => event.id === eventId)// refactor with .find()?
    this.props.fetchSingleEvent(singleEvent[0])
    this.props.navigation.navigate('Event Details')
  }

  formatEvents = () => {
    const itinEvents = this.props.events
    const newEvts = []
    itinEvents.forEach(evt => {
      const subHeader = {title: moment(evt.startTime).format("dddd MMMM Do"), header: true}
      if (!newEvts.length) {
        newEvts.push(subHeader)
      } else {
        const lastTime = moment(newEvts[newEvts.length - 1].startTime).format("dddd MMMM Do")
        const curEvtTime = moment(evt.startTime).format("dddd MMMM Do")
        if (lastTime !== curEvtTime) {
          newEvts.push(subHeader)
        }
      }
      newEvts.push(evt)
    })
    return newEvts
  }

  stickyHeaderArr = (evtArr) => {
    const arr = [];
    evtArr.map(obj => {
      if (obj.header) {
        arr.push(evtArr.indexOf(obj));
      }
    });
    arr.push(0);
    return arr
  }

  renderItem = ({ item }) => {
    if (item.header) {
      return (
        <ListItem itemDivider>
          <Left />
          <Body style={{ marginRight: 40 }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.title}
            </Text>
          </Body>
          <Right />
        </ListItem>
      );
    } else if (!item.header) {
      return (
        <ListItem style={{ marginLeft: 20 }}>
          <Body>
            <Text onPress={() => this.handleClick(item.id)}>{item.title} {moment(item.startTime).format("h:mm a")} to {moment(item.endTime).format("h:mm a")}</Text>
          </Body>
        </ListItem>
      );
    }
  };

  render() {

    return (
      <View>
        <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.title}
        stickyHeaderIndices={this.state.stickyHeader}
      />
        {/* <List.Section>
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
        </List.Section> */}
        <Button
        title="Create Event"
        onPress={() => this.props.navigation.navigate('Create Event')}
      />
    </View>
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
