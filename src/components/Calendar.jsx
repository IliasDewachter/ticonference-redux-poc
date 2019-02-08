import * as React from 'react';

import BigCalendar from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from 'moment';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import connect from "react-redux/es/connect/connect";
import {createEvent, updateEvent} from "../actions/calendar.action";

import styles from './Calendar.module.css';

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

class Calendar extends React.PureComponent {
    render() {
        const {events} = this.props;
        return (
            <DnDCalendar
                localizer={localizer}
                events={events}
                defaultView='week'
                views={['week']}
                selectable
                resizable
                onEventDrop={this.handleEventChange}
                onSelectSlot={this.handleEventCreate}
                className={styles.calendar}
            />
        );
    }

    handleEventChange = (event) => {
        const {updateEvent} = this.props;
        const id = event.event.id;
        event.allDay = event.isAllDay || false;
        updateEvent(id, event);
    };

    handleEventCreate = (data) => {
        const {createEvent} = this.props;
        const title = window.prompt('New Event name');
        if (title) {
            createEvent(title, data);
        }
    }
}

const mapStateToProps = state => ({
    events: state.calendar.events
});

const mapDispatchToProps = dispatch => ({
    createEvent: (title, data) => dispatch(createEvent(title, data)),
    updateEvent: (id, data) => dispatch(updateEvent(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);