import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
} from 'bloomer';

import './Header.css';

const Header = () => (
    <Navbar className="header is-fixed-top">
        <NavbarBrand>
            <NavbarItem>
                <img src={require('../assets/recordbin-logo.png')} alt="logo"/>
                <span style={{ marginLeft: '1rem'}}>Record Bin</span>
            </NavbarItem>
        </NavbarBrand>
    </Navbar>
);

export default Header;
