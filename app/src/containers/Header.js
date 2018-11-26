import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Navbar,
    NavbarBrand,
    NavbarEnd,
    NavbarItem,
    NavbarMenu,
} from 'bloomer';

import './Header.css';

class Header extends Component {

    render() {
        return (
            <Navbar className="header">
                <NavbarBrand>Record Bin</NavbarBrand>
                <NavbarMenu>
                    <NavbarEnd>
                        <NavbarItem>
                            Settings
                        </NavbarItem>
                    </NavbarEnd>
                </NavbarMenu>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({ player: state.player });

export default connect(mapStateToProps)(Header);
