import React, { Component } from 'react';
import { Container } from 'bloomer';
import 'bulma/css/bulma.css';

import './App.css';
import Header from './containers/Header';
import Player from './containers/Player';
import Root from './containers/Root';

class App extends Component {
    render() {
        return (
            <div className="is-fullheight">
                <Header/>
                <Container>
                    <Root/>
                </Container>
                <div className="player">
                    <Player/>
                </div>
            </div>
        );
    }
}

export default App;
