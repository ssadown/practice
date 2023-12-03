import React, {useContext} from 'react';
import NavElement from './NavElement';
import { NavContext } from '../../context/context';

const NavList = () => {
    const navigation = [
        {id: 1, element: 'Игровое поле', link: '/game'},
        {id: 2, element: 'Рейтинг', link: '/rating'},
        {id: 3, element: 'Активные игроки', link: '/active'},
        {id: 4, element: 'История игр', link: '/history'},
        {id: 5, element: 'Список игроков', link: '/players'}
    ]
    const navId = useContext(NavContext)
    const changeNavId = (id) => {
        navId.setNavId(id)
    }
    return (
        <div className='nav-list'>
            <ul>
                {navigation.map((el) => {
                    return(
                        <NavElement change={() => {changeNavId(el.id)}} activeId={navId.navId} link={el.link} key={el.id} id={el.id} element={el.element}/>
                    )
                })}
            </ul>
        </div>
    );
}

export default NavList;
