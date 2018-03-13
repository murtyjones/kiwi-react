import reducer from './reducers/index'
import thunk from 'redux-thunk'
import { setStoreForFetch } from './utils/ApiFetch'
import { applyMiddleware, createStore, compose } from 'redux'
import loadFullStory from './utils/loadFullStory'

// devtools!
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunk]
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middleware)))

loadFullStory(store)

export default store