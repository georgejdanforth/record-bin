/* global chrome */
import React, { Component } from 'react';
import { Container } from 'bloomer';
import 'bulma/css/bulma.css';

import './App.css';
import Header from './components/Header';
import Player from './containers/Player';
import Root from './containers/Root';
import LoadingOverlay from './components/LoadingOverlay';
import { scrape } from './utils';

class App extends Component {

    state = {
        loading: false,
    };

    componentDidMount() {
        chrome.runtime.onMessage.addListener(
            (request, sender, sendResponse) =>
                this.setState({ loading: true }, () =>
                    scrape(request.url)
                        .then(track =>
                            this.setState({ loading: false }, () =>
                                console.log(track)))
                        .catch(error => console.log(error)))
        );
    }

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
                { this.state.loading && <LoadingOverlay/> }
            </div>
        );
    }
}

export default App;
