import axios from 'axios'
import serverUrl from '../serverUrl'
import { GOOGLE_MAPS_API_KEY } from '../secrets'

//Action Types
const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'
const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT'
const CLEAR_SINGLE_EVENT = 'CLEAR_SINGLE_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'

//Action Creator
const getAllEvents = (events) => ({
  type: GET_ALL_EVENTS,
  events
})

export const getSingleEvent = (event) => ({
  type: GET_SINGLE_EVENT,
  event
})

const createNewEvent = (event) => ({
  type: CREATE_NEW_EVENT,
  event
})

export const clearSingleEvent = () => ({
  type: CLEAR_SINGLE_EVENT
})

const dltEvent = (evtId) => ({
  type: DELETE_EVENT,
  evtId
})

const uptEvent = (event) => ({
  type: UPDATE_EVENT,
  event
})

//Thunk Creator
export const fetchAllEvents = (tripId) => async dispatch => {
  try {
    const events = await axios.get(`${serverUrl}/api/events/trip/${tripId}`)
    dispatch(getAllEvents(events.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleEvent = (eventId) => async dispatch => {
  try {
    const singleEvent = await axios.get(`${serverUrl}/api/events/${eventId}`)
    dispatch(getSingleEvent(singleEvent.data))
  } catch (error) {
    console.error(error)
  }
}

export const createEvent = (event) => async dispatch => {
  try {
    const { data: mapLocation } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${event.location}&key=${GOOGLE_MAPS_API_KEY}`)

    if (!mapLocation.results.length) {
      alert ('Invalid location')
    } else {
      const coordinate = mapLocation.results[0].geometry.location
      const newEvent = {
        ...event,
        "coordinate": {
          "latitude": coordinate.lat,
          "longitude": coordinate.lng,
          "latitudeDelta": 0.05,
          "longitudeDelta": 0.05
      }}
      const singleEvent = await axios.post(`${serverUrl}/api/events`, newEvent)

      dispatch(createNewEvent(singleEvent.data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateEvent = (event, evtId) => async dispatch => {
  try {
    const { data: mapLocation } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${event.location}&key=${GOOGLE_MAPS_API_KEY}`)
    if (!mapLocation.results.length) {
      alert ('Invalid location')
    } else {
      const coordinate = mapLocation.results[0].geometry.location
      const newEvent = {
        ...event,
        "coordinate": {
          "latitude": coordinate.lat,
          "longitude": coordinate.lng,
          "latitudeDelta": 0.05,
          "longitudeDelta": 0.05
      }}
      const singleEvent = await axios.put(`${serverUrl}/api/events/${evtId}`,newEvent)
      const fetchedEvent = await axios.get(`${serverUrl}/api/events/${singleEvent.data.id}`)
      dispatch(uptEvent(fetchedEvent.data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteEvent = (evtId) => async dispatch => {
  try {
    await axios.delete(`${serverUrl}/api/events/${evtId}`)
    dispatch(dltEvent(evtId))
  } catch (error) {
    console.error(error)
  }
}

//Initial State
const initialState = {
  allEvents: [],
  singleEvent: {}
}

//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {...state, allEvents: action.events}
    case GET_SINGLE_EVENT:
      return {...state, singleEvent: action.event}
    case CREATE_NEW_EVENT:
      return {
        allEvents: [...state.allEvents, action.event],
        singleEvent: action.event
      }
    case CLEAR_SINGLE_EVENT:
      return initialState
    case DELETE_EVENT:
      const filteredEvents = state.allEvents.filter(evt => evt.id !== action.evtId)
      return {...state, allEvents: filteredEvents}
    case UPDATE_EVENT:
      return { ...state, singleEvent: action.event }
    default:
      return state
  }
}
