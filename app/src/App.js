import React, { Component } from 'react';
import 'bulma/css/bulma.css';

import './App.css';
import Header from './containers/Header';
import Root from './containers/Root';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Root/>
            </div>
        );
    }
}

export default App;
