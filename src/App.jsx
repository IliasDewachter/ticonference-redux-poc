import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import styles from './App.module.css';

import combinedReducers from './reducers';
import Calendar from "./components/Calendar";
import UpcomingEvents from './components/UpcomingEvents';


const storeEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // UNCOMMENT FOR REDUX DEVTOOLS
);
const store = createStore(combinedReducers, storeEnhancers);


const App = () => (
    <Provider store={store}>
        <div className={styles.flex}>
            <div className={styles.grow}>
                <Calendar />
            </div>
            <UpcomingEvents/>
        </div>
    </Provider>
);

export default App;
