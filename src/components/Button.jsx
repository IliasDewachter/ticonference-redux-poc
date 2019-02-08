import * as React from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from '../actions/calendar.action';

const Button = ({ fetchEvents }) => (
    <button onClick={fetchEvents}>Fetch Events</button>
);

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents())
});

export default connect(null, mapDispatchToProps)(Button);