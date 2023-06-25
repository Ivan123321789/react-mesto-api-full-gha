import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import logo from '../images/logo-header.svg';

function Header({ userEmail, handleSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />

        {location.pathname === "/signin" ? (
          <div className="header__button-container">
            <NavLink to="/signup" className="login__link">Регистрация</NavLink>
          </div> 
        ) : null}
        {location.pathname === "/signup" ? (
          <div className="header__button-container">
            <NavLink to="/signin" className="login__link">Войти</NavLink>
          </div> 
        ) : null}
        {location.pathname === "/" ? (
          <div className='header__menu'>
            <p className='header__user-email'>{userEmail}</p>
            <NavLink to='/signin' className='header__link-exit' onClick={handleSignOut}>Выйти</NavLink>
          </div> 
        ) : null}
    </header>
  )
}

export default Header