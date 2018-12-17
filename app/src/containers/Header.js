import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
} from 'bloomer';

import './Header.css';

class Header extends Component {

    render() {
        return (
            <Navbar className="header is-fixed-top">
                <NavbarBrand>
                    <NavbarItem>
                        <img src={require('../assets/recordbin-logo.png')} alt="logo"/>
                        <span style={{ marginLeft: '1rem'}}>Record Bin</span>
                    </NavbarItem>
                </NavbarBrand>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({ player: state.player });

export default connect(mapStateToProps)(Header);
