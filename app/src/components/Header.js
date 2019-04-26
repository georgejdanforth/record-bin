import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarMenu,
} from 'bloomer';

import './Header.css';
import Export from '../containers/Export';

const Header = () => (
    <Navbar className="header is-fixed-top">
        <NavbarBrand>
            <NavbarItem>
                <img src={require('../assets/recordbin-logo.png')} alt="logo"/>
                <span style={{ marginLeft: '1rem'}}>Record Bin</span>
            </NavbarItem>
        </NavbarBrand>
        <NavbarMenu>
            <Export/>
        </NavbarMenu>
    </Navbar>
);

export default Header;
