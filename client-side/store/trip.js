import axios from 'axios'
import serverUrl from '../serverUrl'

//Action Types
const GET_ALL_TRIPS = 'GET_ALL_TRIPS'
const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP'
const CREATE_TRIP = 'CREATE_TRIP'

//Action Creator
const getAllTrips = (trips) => ({
  type: GET_ALL_TRIPS,
  trips
})

const getSingleTrip = (trip) => ({
  type: GET_SINGLE_TRIP,
  trip
})

const createdTrip = (newTrip) => ({
  type: CREATE_TRIP,
  newTrip
})

//Thunk Creator
export const fetchAllTrips = (userId) => async dispatch => {
  try {
    const trips = await axios.get(`${serverUrl}/api/trips/user/${userId}`)
    dispatch(getAllTrips(trips.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleTrip = (tripId) => async dispatch => {
  try {
    const singleTrip = await axios.get(`${serverUrl}/api/trips/${tripId}`)
    dispatch(getSingleTrip(singleTrip.data))
  } catch (error) {
    console.error(error)
  }
}

export const createTripServer = (tripInfo, navigation) => async dispatch => {
  try {
    const newTrip = await axios.post(`${serverUrl}/api/trips`, tripInfo)
    dispatch(createdTrip(newTrip.data))
    navigation.navigate('SingleTrip')
  } catch (error) {
    console.error(error)
  }
}

//Initial State
const initialState = {
  allTrips: [],
  singleTrip: {}
}

//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      return { ...state, allTrips: action.trips }
    case GET_SINGLE_TRIP:
      return { ...state, singleTrip: action.trip }
    case CREATE_TRIP:
      return { ...state, singleTrip: action.newTrip }
    default:
      return state
  }
}
