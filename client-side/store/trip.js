import axios from 'axios'
import serverUrl from '../serverUrl'

//Action Types
const GET_ALL_TRIPS = 'GET_ALL_TRIPS'

//Action CreatoR
const getAllTrips = (trips) => ({
  type: GET_ALL_TRIPS,
  trips
})

//Thunk Creator
export const gotAlltrips = (userId) => async dispatch => {
  try {
    const trips = await axios.get(`${serverUrl}/api/trips/user/${userId}`)
    dispatch(getAllTrips(trips))
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
      return {...state, allTrips: action.trips}
    default:
      return state
  }
}
