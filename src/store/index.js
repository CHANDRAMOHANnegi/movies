import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import userReducer from './reducers/UserReducer';
import thunk from 'redux-thunk';

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'authType',
    storage: storage,
    // whitelist: // which reducer want to store
};

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ userReducer });

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    pReducer,
    storeEnhancers(applyMiddleware(thunk))
);

export default store;