import axios from 'axios'
import serverUrl from '../serverUrl'

//Action Types
const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'
const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT'

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
    const singleEvent = await axios.post(`${serverUrl}/api/events`, event)
    dispatch(createNewEvent(singleEvent.data))
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
    default:
      return state
  }
}
