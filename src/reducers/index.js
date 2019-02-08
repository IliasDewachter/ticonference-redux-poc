import { combineReducers } from 'redux';
import calendarReducer from './calendar.reducer';

export default combineReducers({
    calendar: calendarReducer
})