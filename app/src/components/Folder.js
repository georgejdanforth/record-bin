import React, { Component } from 'react';
import { Button } from 'bloomer';
import _ from 'lodash';

import AddFolder from './AddFolder';

class Folder extends Component {

    state = {
        addingFolder: false,
        folders: []
    };

    componentDidMount()  {
        this.setState({
            folders: this.props.folders.map(
                folder => <li key={folder.id}><Folder {...folder}/></li>
            )
        });
    }

    insertAddFolder = () => this.setState({
        addingFolder: true,
        folders: _.concat(
            this.state.folders,
            [<li key={'add'}><AddFolder/></li>]
        )
    });

    render() {
        return (
            <div>
                <span>
                    { this.props.name }
                    <Button
                        disabled={this.state.addingFolder}
                        onClick={this.insertAddFolder}
                    >
                        +
                    </Button>
                </span>
                <ul>{ this.state.folders }</ul>
            </div>
        );
    }
}

export default Folder;