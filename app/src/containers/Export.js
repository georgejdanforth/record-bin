import React, { Component } from 'react';
import { NavbarEnd, NavbarItem } from 'bloomer';

class Export extends Component {
    render() {
        return (
            <NavbarEnd>
                <NavbarItem>Export library to:</NavbarItem>
                <NavbarItem href="#">CSV</NavbarItem>
                <NavbarItem href="#">JSON</NavbarItem>
            </NavbarEnd>
        );
    }
}

export default Export;