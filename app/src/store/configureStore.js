import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import createChromeStorage from 'redux-persist-chrome-storage';
import storage from 'redux-persist/lib/storage';


import rootReducer from '../reducers';


// const storage = createChromeStorage(window.chrome, 'sync');

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(persistedReducer, initialState, composeEnhancers());

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    const persistor = persistStore(store);

    return { store, persistor };
};

export default configureStore;
