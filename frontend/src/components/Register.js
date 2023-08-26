import React from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister, onLogout}) {
    const [userInfo, setUserInfo] = React.useState({password:'', email:''});

    const handleChange = (e) => {
        const {name, value} = e.target;
    
        setUserInfo({
          ...userInfo,
          [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(userInfo);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form name="register" className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input" type="email" name="email" id="email-input" placeholder="Email" required minLength="2" value={userInfo.email} onChange={handleChange}/>
                <input className="auth__input" type="password" name="password" id="password-input" placeholder="Пароль" required minLength="2" value={userInfo.password} onChange={handleChange}/>
                <input className="auth__submit-button" type="submit" value="Отправить"/>
            </form>
            <Link className='auth__question' to="/login" onClick={onLogout}>Уже зарегистрированы? Войти</Link>
        </div>
    );
  }
  
export default Register;