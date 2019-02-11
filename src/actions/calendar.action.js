import axios from 'axios';
import generateId from '../id';
export const FETCH_EVENTS = "FETCH_EVENTS";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILED = "FETCH_EVENTS_FAILED";
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

const url = "http://localhost:3001";

export const fetchEvents = () => dispatch => {
    dispatch({
        type: FETCH_EVENTS
    });
    axios.get(`${url}/events`)
        .then(result => {
            const events = result.data.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            }));
            dispatch({
                type: FETCH_EVENTS_SUCCESS,
                payload: events
            });
        })
        .catch(() => dispatch({
            type: FETCH_EVENTS_FAILED
        }));
};

export const createEvent = (title, { start, end, allDay }) => dispatch => {
    const event = {
        title, start, end, allDay,
        id: generateId()
    };

    axios.post(`${url}/event`, { event });

    dispatch({
        type: CREATE_EVENT,
        payload: event
    });
};

export const updateEvent = ({ id, title, start, end, allDay }) => dispatch => {
    const event = {
        id, title, start, end, allDay,
    };

    axios.put(`${url}/event`, { event });

    dispatch({
        type: UPDATE_EVENT,
        payload: event
    });
};

export const deleteEvent = (id) => dispatch => {
    axios.delete(`${url}/event/${id}`,);

    dispatch({
        type: DELETE_EVENT,
        payload: id
    });
};