import React, { Component } from 'react';

import './AddTrack.css';
import { MusicIcon } from './icons';
import { scrape } from '../scrapers';

class AddTrack extends Component {

    state = { trackUrl: null };

    componentDidMount() {
        this.input.focus();
    }

    updateTrackUrl = ({ target }) => this.setState({ trackUrl: target.value });

    handleKeyUp = ({ key }) => {
        switch (key) {
            case 'Enter':
                scrape(this.state.trackUrl)
                    .then(result => console.log(result))
                    .catch(error => console.log(error));
                break;
            case 'Escape':
                this.props.cancelAddTrack();
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <div>
                <MusicIcon/>
                <input
                    className="add-track-input"
                    onBlur={this.props.cancelAddTrack}
                    onChange={this.updateTrackUrl}
                    onKeyUp={this.handleKeyUp}
                    placeholder="Track URL"
                    ref={input => this.input = input}
                    type="text"
                />
            </div>
        );
    }
}

export default AddTrack;