import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store from './store/index';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));