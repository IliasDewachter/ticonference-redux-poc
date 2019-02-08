import axios from 'axios';
import moment from "moment";
import generateId from '../id';
export const FETCH_EVENTS = "FETCH_EVENTS";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILED = "FETCH_EVENTS_FAILED";
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";

const events = [
    {
        id: generateId(),
        start: new Date(moment().add(1, "hours")),
        end: new Date(moment().add(3, "hours")),
        allDay: false,
        title: "Some title"
    }
];

export const fetchEvents = () => dispatch => {
    dispatch({
        type: FETCH_EVENTS
    });
    dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: events
    });
    /*
    axios.get('http://localhost:3001/agenda')
        .then(result => dispatch({
            type: FETCH_CALENDAR_SUCCESS,
            payload: result.data
        }))
        .catch(() => dispatch({
            type: FETCH_CALENDAR_FAILED
        }));
        */
};

export const createEvent = (title, {start, end, allDay}) => dispatch => {
    dispatch({
        type: CREATE_EVENT,
        payload: {
            title, start, end, allDay
        }
    })
};

export const updateEvent = (id, {title, start, end, allDay}) => dispatch => {
    dispatch({
        type: UPDATE_EVENT,
        payload: {
            id, title, start, end, allDay
        }
    })
};