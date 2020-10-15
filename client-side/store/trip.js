import axios from 'axios'
import serverUrl from '../serverUrl'

//Action Types
const GET_ALL_TRIPS = 'GET_ALL_TRIPS'
const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP'
const ADD_GUEST = 'ADD_GUEST'
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

const addGuest = (guest) => ({
  type: ADD_GUEST,
  guest
})

const createTrip = (trip) => ({
  type: CREATE_TRIP,
  trip
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

export const fetchSingleTrip = (tripId) => async (dispatch, getState) => {
  try {
    const userId = getState().user.id
    const singleTrip = await axios.get(`${serverUrl}/api/trips/${tripId}/user/${userId}`)
    dispatch(getSingleTrip(singleTrip.data))
  } catch (error) {
    console.error(error)
  }
}

export const createTripServer = (tripInfo) => async (dispatch, getState) => {
  try {
    const user = getState().user
    const guestList = getState().trips.guestList
    const newTrip = await axios.post(`${serverUrl}/api/trips`, {tripInfo, user, guestList})
    const trip = await axios.get(`${serverUrl}/api/trips/${newTrip.data.id}/user/${user.id}`)
    dispatch(createTrip(trip.data))
  } catch (error) {
    console.error(error)
  }
}

export const findAddGuest = (email) => async (dispatch, getState) => {
  try {
    if (!getState().trips.guestList.some(guest => guest.email === email)) {
      const foundGuest = await axios.get(`${serverUrl}/api/users/email/${email}`)
      if(foundGuest.data.error) {
        alert(foundGuest.data.error)
      } else {
        dispatch(addGuest(foundGuest.data))
      }
    } else {
      alert('Guest already invited!')
    }
  } catch (error) {
    console.error(error)
  }
}

//Initial State
const initialState = {
  allTrips: [],
  singleTrip: {},
  guestList: []
}

//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      return { ...state, allTrips: action.trips }
    case GET_SINGLE_TRIP:
      return { ...state, singleTrip: action.trip }
    case CREATE_TRIP:
      return { ...state, allTrips: [...state.allTrips, action.trip], singleTrip: action.trip, guestList: [] }
    case ADD_GUEST:
      return { ...state, guestList: [...state.guestList, action.guest] }
    default:
      return state
  }
}
