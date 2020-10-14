import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import user from "./user"
import messages from "./messages"
import trips from './trip'


const reducer = combineReducers({user, messages, trips})

const middleware = applyMiddleware(thunkMiddleware)
//, createLogger({ collapsed: false }))

const store = createStore(reducer, middleware)

export default store
export * from "./user"
export * from "./messages"
export * from './trip'
