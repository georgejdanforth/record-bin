import React, { Component } from 'react';
import 'bulma/css/bulma.css';

import './App.css';
import Header from './containers/Header';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
            </div>
        );
    }
}

export default App;
