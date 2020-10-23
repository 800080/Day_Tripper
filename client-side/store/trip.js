import axios from 'axios'
import serverUrl from '../serverUrl'
import { GOOGLE_MAPS_API_KEY } from '../secrets'

//Action Types
const GET_ALL_TRIPS = 'GET_ALL_TRIPS'
const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP'
const ADD_GUEST = 'ADD_GUEST'
const CREATE_TRIP = 'CREATE_TRIP'
const CLEAR_GUEST_LIST = 'CLEAR_GUEST_LIST'
const GET_GUESTS_SINGLETRIP = 'GET_GUESTS_SINGLETRIP'
const DELETE_TRIP = 'DELETE_TRIP'
const REMOVE_GUEST = 'REMOVE_GUEST'
const UPDATE_TRIP = 'UPDATE_TRIP'

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

export const clearGuestList = () => ({
  type: CLEAR_GUEST_LIST
})

const getGuestSingleTrip = (guests) => ({
  type: GET_GUESTS_SINGLETRIP,
  guests
})

const dltTrip = (tripId) => ({
  type: DELETE_TRIP,
  tripId
})

export const rmvGuest = (userId) => ({
  type: REMOVE_GUEST,
  userId
})

const updTrip = (trip) => ({
  type: UPDATE_TRIP,
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
    const { data: mapLocation } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${tripInfo.location}&key=${GOOGLE_MAPS_API_KEY}`)
    const coordinate = mapLocation.results[0].geometry.location
    const newTrip = await axios.post(`${serverUrl}/api/trips`, {tripInfo, user, guestList})
    await axios.post(`${serverUrl}/api/maps/trip`, {tripId: newTrip.data.id, coordinate})
    const trip = await axios.get(`${serverUrl}/api/trips/${newTrip.data.id}/user/${user.id}`)
    dispatch(createTrip(trip.data))
    dispatch(updateStatus(trip.data.id, user.id, 'accepted', true))
    dispatch(clearGuestList())
  } catch (error) {
    console.error(error)
  }
}

export const updateTrip = (tripInfo) => async (dispatch, getState) => {
  try {
    const user = getState().user
    const singleTrip = getState().trips.singleTrip
    const { data: mapLocation } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${tripInfo.location}&key=${GOOGLE_MAPS_API_KEY}`)
    const coordinate = mapLocation.results[0].geometry.location
    const newTrip = await axios.put(`${serverUrl}/api/trips/${singleTrip.id}`, {tripInfo})
    await axios.post(`${serverUrl}/api/maps/trip`, {tripId: newTrip.data.id, coordinate})
    const trip = await axios.get(`${serverUrl}/api/trips/${newTrip.data.id}/user/${user.id}`)
    dispatch(updTrip(trip.data))
  } catch (error) {
    console.error(error)
  }
}

export const findAddGuest = (email, tripId) => async (dispatch, getState) => {
  try {
    if (!getState().trips.guestList.some(guest => guest.email === email)) {
      let foundGuest
      if (!tripId) {
        foundGuest = await axios.get(`${serverUrl}/api/users/email/${email}`)
      } else {
        foundGuest = await axios.get(`${serverUrl}/api/users/email/${email}/trips/${tripId}`)
      }
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

export const fetchGuests = (tripId) => async dispatch => {
  try {
    const guests = await axios.get(`${serverUrl}/api/users/trip/${tripId}`)
    dispatch(getGuestSingleTrip(guests.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateStatus = (tripId, userId, status, isHost = false) => async dispatch => {
  try {
    await axios.put(`${serverUrl}/api/trips/${tripId}/user/${userId}`, {status, isHost})
    const updatedTrip = await axios.get(`${serverUrl}/api/trips/${tripId}/user/${userId}`)
    dispatch(getSingleTrip(updatedTrip.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeGuest = (tripId, userId) => async dispatch => {
  try {
    await axios.delete(`${serverUrl}/api/trips/${tripId}/user/${userId}`)
    dispatch(rmvGuest(userId))
  } catch (error) {
    console.error(error)
  }
}

export const deleteTrip = (tripId) => async dispatch => {
  try {
    await axios.delete(`${serverUrl}/api/trips/${tripId}`)
    dispatch(dltTrip(tripId))
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
      return { ...state, allTrips: [...state.allTrips, action.trip], singleTrip: action.trip }
    case ADD_GUEST:
      return { ...state, guestList: [...state.guestList, action.guest] }
    case GET_GUESTS_SINGLETRIP:
      return { ...state, guestList: action.guests }
    case CLEAR_GUEST_LIST:
      return { ...state, guestList: [] }
    case DELETE_TRIP:
      const filteredTrips = state.allTrips.filter(trip => trip.id !== action.tripId)
      return {...state, allTrips: filteredTrips}
    case REMOVE_GUEST:
      return {...state, guestList: state.guestList.filter(guest => guest.id !== action.userId)}
    case UPDATE_TRIP:
      return { ...state, singleTrip: action.trip }
    default:
      return state
  }
}
