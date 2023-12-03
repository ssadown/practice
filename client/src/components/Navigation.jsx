import React from 'react';
import Logo from './helpers/Logo';
import NavList from './helpers/NavList';
import Exit from './helpers/Exit';

const Navigation = () => {
    return (
        <div className='nav-block'>
            <nav>
                <Logo/>
                <NavList/>
                <Exit/>
            </nav>
        </div>
    );
}

export default Navigation;
