import React, { Component } from 'react';

import './AddTrack.css';
import { MusicIcon } from './icons';

class AddTrack extends Component {

    state = { trackUrl: null };

    componentDidMount() {
        this.input.focus();
    }

    updateTrackUrl = ({ target }) => this.setState({ trackUrl: target.value });

    render() {
        return (
            <div>
                <MusicIcon/>
                <input
                    className="add-track-input"
                    onBlur={this.props.cancelAddTrack}
                    onChange={this.updateTrackUrl}
                    placeholder="Track URL"
                    ref={input => this.input = input}
                    type="text"
                />
            </div>
        );
    }
}

export default AddTrack;