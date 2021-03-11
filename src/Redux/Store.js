import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootreducer from '../Redux/Rootreducer'

const store= createStore(rootreducer,applyMiddleware(logger,thunk))

export default store;