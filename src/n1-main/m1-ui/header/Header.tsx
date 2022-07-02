import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css';
import navIcon from './NavIcon.png';
import {PATH} from '../main/Main';

const image = <img src={navIcon} alt={'nav-menu'} width={25} height={25}/>;

export const Header = () => {
    return (
        <div className={style.header}>
            <NavLink to={PATH.LOGIN} className={style.link}>login</NavLink>
            <NavLink to={PATH.REGISTRATION} className={style.link}>registration</NavLink>
            <NavLink to={PATH.PROFILE} className={style.link}>profile</NavLink>
            <NavLink to={PATH.ERROR_404} className={style.link}>error404</NavLink>
            <NavLink to={PATH.PASSWORD_RESET} className={style.link}>passwordReset</NavLink>
            <NavLink to={PATH.PASSWORD_NEW} className={style.link}>passwordNew</NavLink>
            <NavLink to={PATH.TEST} className={style.link}>test</NavLink>
            <div className={style.block}>{image}</div>
        </div>
    );
};
