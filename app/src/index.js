import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './index.css';
import App from './App';
import configureStore from './store/configureStore';


const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <DragDropContextProvider backend={HTML5Backend}>
                <App/>
            </DragDropContextProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
