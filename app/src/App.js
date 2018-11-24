import React, { Component } from 'react';
import { Container } from 'bloomer';
import 'bulma/css/bulma.css';

import './App.css';
import Header from './containers/Header';
import Root from './containers/Root';

class App extends Component {
    render() {
        return (
            <Container>
                <Header/>
                <Root/>
            </Container>
        );
    }
}

export default App;
