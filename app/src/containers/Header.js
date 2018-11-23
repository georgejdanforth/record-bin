import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'bloomer';

import { addFolder } from '../actions/directoryTree';

class Header extends Component {

    state = { folderName: null };

    updateFolderName = ({ target }) => this.setState({
        folderName: target.value
    });

    addFolder = () => this.props.addFolder(
        this.props.directoryTree,
        [],
        this.state.folderName
    );

    render() {
        return (
            <div>
                <Input
                    onChange={this.updateFolderName}
                    placeholder={'Folder Name'}
                />
                <Button onClick={this.addFolder}>Add Folder</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ directoryTree: state.directoryTree });

export default connect(mapStateToProps, { addFolder })(Header);