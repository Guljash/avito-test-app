import {combineReducers, createStore} from 'redux'
import storiesReducer from "./reducers/storiesReducer"

let reducers = combineReducers({
    storiesPage: storiesReducer
});

let store = createStore(reducers);

export default store