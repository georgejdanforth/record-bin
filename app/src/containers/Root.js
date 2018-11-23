import React, { Component } from 'react';
import { connect } from 'react-redux';

import Folder from '../components/Folder';

class Root extends Component {

    state = { folders: [] };

    componentDidMount() {
        this.setState({
            folders: this.props.directoryTree.folders.map(
                folder => <li key={folder.id}><Folder{...folder}/></li>
            )
        });
    }

    render() {
        return <ul>{ this.state.folders }</ul>;
    }
}

const mapStateToProps = state => ({ directoryTree: state.directoryTree });

export default connect(mapStateToProps)(Root);