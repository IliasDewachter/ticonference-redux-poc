import * as React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import Button from './components/Button';
import combinedReducers from './reducers';
import Calendar from "./components/Calendar";


const storeEnhancers = compose(
    applyMiddleware(thunk),
    /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/ // UNCOMMENT FOR REDUX DEVTOOLS
);
const store = createStore(combinedReducers, storeEnhancers);


const App = () => (
    <Provider store={store}>
        <Button/>
        <Calendar/>
    </Provider>
);

export default App;
