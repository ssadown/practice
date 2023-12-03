import React from 'react';
import { Link } from 'react-router-dom';

const NavElement = (props) => {
    return (
        <div>
            <li className={props.activeId === props.id ? 'nav-element-check' : ' '} onClick={props.change}><Link to={props.link} className='nav-link'>{props.element}</Link></li>
        </div>
    );
}

export default NavElement;
