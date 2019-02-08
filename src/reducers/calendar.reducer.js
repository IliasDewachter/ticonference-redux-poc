import produce from 'immer';
import generateId from '../id';
import {FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILED, CREATE_EVENT, UPDATE_EVENT} from '../actions/calendar.action';

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
                    const {title, start, end, allDay} = action.payload;
                    const id = generateId();
                    draft.events.push({
                        id, title, start, end, allDay
                    });
                    return;
                }

                case UPDATE_EVENT: {
                    const {id, title, start, end, allDay} = action.payload;
                    const event = draft.events.find(e => e.id === id);
                    if (title !== undefined) event.title = title;
                    if (start !== undefined) event.start = start;
                    if (end !== undefined) event.end = end;
                    if (allDay !== undefined) event.allDay = allDay;
                    return;
                }

                default:
                    return;
            }
        }
    );

export default reducer;