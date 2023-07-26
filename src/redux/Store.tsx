import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {initState, Reducer} from './Reducer';
export const Store = createStore(Reducer, initState, applyMiddleware(thunk));
