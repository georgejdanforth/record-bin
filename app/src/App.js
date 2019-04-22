/* global chrome */
import React, { Component } from 'react';
import { Container } from 'bloomer';
import 'bulma/css/bulma.css';

import './App.css';
import AddTrackModal from './containers/AddTrackModal';
import Header from './components/Header';
import Player from './containers/Player';
import Root from './containers/Root';
import LoadingOverlay from './components/LoadingOverlay';
import { scrape } from './utils';

class App extends Component {

    state = {
        loading: false,
        isModalActive: false,
        track: null,
    };

    componentDidMount() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
            this.setState({ loading: true }, () =>
                scrape(request.url)
                    .then(track => this.setState({
                        loading: false,
                        isModalActive: true,
                        track: track,
                    }))
                    .catch(error => console.log(error)))
        );
    }

    closeModal = () => this.setState({ isModalActive: false, track: null });

    render() {
        return (
            <div className="is-fullheight">
                <AddTrackModal
                    isActive={this.state.isModalActive}
                    close={this.closeModal}
                    track={this.state.track}
                />
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
