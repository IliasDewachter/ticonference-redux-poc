import * as React from 'react';
import {connect} from 'react-redux';
import moment from "moment";
import styles from './UpcomingEvents.module.css';

class UpcomingEvents extends React.PureComponent {

    render() {
        const {nextEvents} = this.props;

        return <div className={styles.container}>
            <h1>Upcoming events</h1>
            {nextEvents.length === 0 && <h2>No upcoming events</h2>}
            <ul className='list-group'>
                {nextEvents.map(event => <div key={event.id} className='list-group-item'>{this.renderEvent(event)}</div>)}
            </ul>
        </div>

    }

    renderEvent(event) {
        return <div>
            <h3>{event.title}</h3>
            <h5 className='float-right'>{moment(event.start).format('h:mm') + ' - ' + moment(event.end).format('h:mm')}</h5>
            <h5>{moment(event.start).format('DD/MM')}</h5>
        </div>
    }

}

const mapStateToProps = state => ({
    nextEvents: getNextEvents(state.calendar.events)
});

export default connect(mapStateToProps, null)(UpcomingEvents);



const getNextEvents = (events) => {
    const currentTime = new Date().getTime();
    return events
        .filter(event => event.start.getTime() - currentTime > 0)
        .sort((a, b) => moment.utc(a.start).diff(moment.utc(b.start)))
        .slice(0, 3);
};