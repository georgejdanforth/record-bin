import React, { Component } from 'react';
import { Container } from 'bloomer';
import 'bulma/css/bulma.css';

import './App.css';
import Root from './containers/Root';

class App extends Component {
    render() {
        return (
            <Container>
                <Root/>
            </Container>
        );
    }
}

export default App;
