import React, { Component } from 'react';
import { Container } from 'bloomer';
import 'bulma/css/bulma.css';

import './App.css';
import Header from './containers/Header';
import Root from './containers/Root';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Container>
                    <Root/>
                </Container>
            </div>
        );
    }
}

export default App;
