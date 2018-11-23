import React, { Component } from 'react';

class Folder extends Component {

    state = { folders: [] };

    componentDidMount()  {
        this.setState({
            folders: this.props.folders.map(
                folder => <li key={folder.id}><Folder {...folder}/></li>
            )
        });
    }

    render() {
        return (
            <div>
                <span>{ this.props.name }</span>
                <ul>{ this.state.folders }</ul>
            </div>
        );
    }
}

export default Folder;