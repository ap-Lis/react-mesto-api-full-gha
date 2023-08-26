import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import logo from '../images/logo/logo.svg';

function Header({email, onLogout}) {

  return (
      <header className="header">
        <img className="header__logo" src={logo} alt = "лого" />
        <Routes>
          <Route path="/register" element={
            <div className='header__container'>
              <Link className='header__link' to="/login">Вход</Link>
            </div>
          }/>
          <Route path="/login" element = {
            <div className='header__container'>
              <Link className='header__link' to="/register">Регистрация</Link>
            </div>
          }/>
          <Route path="/main" element= {
            <div className='header__container'>
              <p className='header__email'>{email}</p>
              <Link className='header__link' to="/login" onClick={onLogout}>Выход</Link>
            </div>
          }/>
        </Routes>
      </header>
  );
}
  
export default Header;