import React, { Component } from 'react';

import './AddTrack.css';
import { ErrorIcon, MusicIcon, SpinnerIcon} from './icons';
import { scrape } from '../scrapers';

class AddTrack extends Component {

    state = {
        trackUrl: null,
        loading: false,
        error: null,
    };

    componentDidMount() {
        this.input.focus();
    }

    updateTrackUrl = ({ target }) => this.setState({
        trackUrl: target.value,
        error: null,
    });

    processUrl = url => this.setState({ loading: true }, () =>
        scrape(url)
            .then(track => this.setState({ loading: false }, () => {
                this.props.addTrack(track);
                this.props.cancelAddTrack();
            }))
            .catch(() => this.setState({ loading: false, error: 'Not a valid URL' }))
    );

    handleKeyUp = ({ key }) => {
        switch (key) {
            case 'Enter':
                this.processUrl(this.state.trackUrl);
                break;
            case 'Escape':
                this.props.cancelAddTrack();
                break;
            default:
                return;
        }
    };

    renderIcon = () => {
        if (this.state.loading) return <SpinnerIcon/>;
        if (this.state.error) return <ErrorIcon/>;
        return <MusicIcon/>;
    };

    render() {
        return (
            <div>
                { this.renderIcon() }
                <input
                    className="add-track-input"
                    disabled={this.state.loading}
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