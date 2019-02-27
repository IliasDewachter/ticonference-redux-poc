import produce from 'immer';
import {
    FETCH_EVENTS,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILED,
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT
} from '../actions/calendar.action';

const initState = {
    status: 'INIT',
    events: []
};

const reducer = (state = initState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case FETCH_EVENTS: {
                return {
                    status: 'FETCHING',
                    events: []
                }
            }

            case FETCH_EVENTS_SUCCESS: {
                return {
                    status: 'SUCCESS',
                    events: action.payload
                }
            }

            case FETCH_EVENTS_FAILED: {
                return {
                    status: 'FAILED',
                    events: []
                }
            }

            case CREATE_EVENT: {
                const { id, title, start, end, allDay } = action.payload;
                draft.events.push({
                    id, title, start, end, allDay
                });
                return;
            }


            case UPDATE_EVENT: {
                const { id, title, start, end, allDay } = action.payload;
                draft.events[draft.events.findIndex(event => event.id === id)] = {
                    id, title, start, end, allDay
                };
                return;
            }


            case DELETE_EVENT: {
                const id = action.payload;
                draft.events.splice(draft.events.findIndex(event => event.id === id), 1);
                return;
            }

            default:
                return;
        }
    }
    );

export default reducer;