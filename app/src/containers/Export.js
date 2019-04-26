import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavbarEnd, NavbarItem } from 'bloomer';
import _ from 'lodash';

class Export extends Component {

    _toCSV = ({ name, tracks, folders }) => _.concat(
        _.flatten(folders.map(this._toCSV)),
        tracks.map(track => ({
            folderName: name,
            ..._.pick(track, ['title', 'url', 'mediaType'])
        }))
    );

    _toJSON = ({ name, tracks, folders }) => ({
        name,
        tracks: tracks.map(track => _.pick(track, ['title', 'url', 'mediaType'])),
        folders: folders.map(this._toJSON),
    });

    toCSV = () => console.log(this._toCSV(this.props.directoryTree));

    toJSON = () => console.log(this._toJSON(this.props.directoryTree));

    render() {
        return (
            <NavbarEnd>
                <NavbarItem>Export library to:</NavbarItem>
                <NavbarItem href="#" onClick={this.toCSV}>CSV</NavbarItem>
                <NavbarItem href="#" onClick={this.toJSON}>JSON</NavbarItem>
            </NavbarEnd>
        );
    }
}

const mapStateToProps = ({ directoryTree }) => ({ directoryTree });

export default connect(mapStateToProps)(Export);