import * as React from 'react';
import {connect} from 'react-redux';
import styles from './UpcomingEvents.module.css';
import moment from "moment";

class UpcomingEvents extends React.PureComponent {

    render() {
        const {nextEvents} = this.props;
        return <div className={styles.container}>
            <h1>Upcoming event</h1>
            {nextEvents.length === 0 && <h2>No upcoming events</h2>}
            {nextEvents.map(event => <div key={event.id}>{this.renderEvent(event)}</div>)}
        </div>
    }

    renderEvent(event) {
        return <h4>
            <div>{event.title + ' ' + moment(event.start).format('DD/MM')}</div>
            <div>{moment(event.start).format('h:mm') + ' - ' + moment(event.end).format('h:mm')}</div>
        </h4>
    }

}

const mapStateToProps = (state, props) => ({
    nextEvents: getNextEvents(props.amount, state.calendar.events)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents);


const getNextEvents = (amount, events) => {
    const currentTime = new Date().getTime();
    return events
        .filter(event => event.start.getTime() - currentTime > 0)
        .sort((a, b) => moment.utc(a.start).diff(moment.utc(b.start)))
        .slice(0, amount);
};