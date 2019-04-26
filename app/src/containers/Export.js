import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavbarEnd, NavbarItem } from 'bloomer';
import _ from 'lodash';
import Papa from 'papaparse';

class Export extends Component {

    getFileName = format => `recordbin-${Date.now().toString()}.${format}`;

    download = (content, format) => {
        const blob = new Blob([content]);
        const downloadLink = window.document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob, {type: 'text/plain'});
        downloadLink.download = this.getFileName(format);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

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

    toCSV = () => this.download(Papa.unparse(this._toCSV(this.props.directoryTree)), 'csv');

    toJSON = () => this.download(JSON.stringify(this._toJSON(this.props.directoryTree)), 'json');

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