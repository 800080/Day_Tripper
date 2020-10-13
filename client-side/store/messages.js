import axios from 'axios'

//Action Types
const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE'
const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES'



//Action Creator
const getNewMessage = (message) => ({
  type: GET_NEW_MESSAGE,
  message
})

const getAllMessages = (messages) => ({
  type: GET_ALL_MESSAGES,
  messages
})


//Thunk Creators

//Initial State
const initialState = []


//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_MESSAGE:
      return [...state, action.message]
    case GET_ALL_MESSAGES:
      return action.messages
    default:
      return state
  }
}
