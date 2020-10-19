import axios from 'axios'
import serverUrl from '../serverUrl'

//Action Types
const SET_COORDS = 'SET_COORDS'

//Action Creator
export const setCoords = (coords) => ({
  type: SET_COORDS,
  coords
})

const initialState = {}

//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COORDS:
      return action.coords
    default:
      return state
  }
}
