import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Text, ListItem, Left, Body, Right } from "native-base";
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'
import { fetchAllEvents, getSingleEvent } from '../store'
import moment from 'moment'
import defaultStyles from './styles'

class Itinerary extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      stickyHeader: []
    }
    this.handleClick = this.handleClick.bind(this)
  }


  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      //Will execute when screen is focused
      await this.props.fetchEvents(this.props.trip.id)
      const newEvts = this.formatEvents()
      const stickyHeader = this.stickyHeaderArr(newEvts)
      this.setState({data: newEvts, stickyHeader})
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }


  getEvents = async () => {
    await this.props.fetchEvents(this.props.trip.id)
    const newEvts = this.formatEvents()
    const stickyHeader = this.stickyHeaderArr(newEvts)
    this.setState({data: newEvts, stickyHeader})

  }

  handleClick = async (eventId) => {
    const singleEvent = this.props.events.filter(event => event.id === eventId)// refactor with .find()?
    await this.props.fetchSingleEvent(singleEvent[0])
    this.props.navigation.navigate('Event Details')
  }

  formatEvents = () => {
    const itinEvents = this.props.events
    const newEvts = []
    itinEvents.forEach(evt => {
      const subHeader = {title: moment(evt.startTime).format("dddd MMMM Do"), header: true }
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
        <ListItem itemDivider style={{backgroundColor: defaultStyles.singleContainer.backgroundColor}}>
          <Left />
          <Body style={{ marginRight: 40 }}>
            <Text style={{ fontWeight: "bold"}}>
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
      <View style= {styles.scrollView}>
        <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.title+Math.floor(Math.random()*100000)}
        stickyHeaderIndices={this.state.stickyHeader}
      />
      <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => this.props.navigation.navigate('Create Event')}
        />
    </View>
      )
  }
}

const mapState = (state) => ({
  events: state.events.allEvents,
  trip: state.trips.singleTrip,
  singleEvent: state.events.singleEvent
})
const mapDispatch = (dispatch) => ({
  fetchEvents: (tripId) => dispatch(fetchAllEvents(tripId)),
  fetchSingleEvent: (event) => dispatch(getSingleEvent(event))
})
export default connect(mapState, mapDispatch)(Itinerary)

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    backgroundColor: "#fdfaec",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
});
