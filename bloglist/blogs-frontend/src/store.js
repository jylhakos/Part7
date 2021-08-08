// $ npm install redux

// $ npm install redux-thunk

// $ npm install --save-dev redux-devtools-extension

import thunk from 'redux-thunk'

import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'

import blogsReducer from './reducers/blogsReducer'

import userReducer from './reducers/userReducer'

const reducers = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

console.log('store.getState()', store.getState())

export default store
