import React from 'react';

function Login({onLogin}) {
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
        onLogin(userInfo);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form name="register" className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input" type="email" name="email" id="email-input" placeholder="Email" required minLength="2" maxLength="40" value={userInfo.email} onChange={handleChange}/>
                <input className="auth__input" type="password" name="password" id="password-input" placeholder="Пароль" required minLength="2" maxLength="200" value={userInfo.password} onChange={handleChange}/>
                <input className="auth__submit-button" type="submit" value="Войти"/>
            </form>
        </div>
    );
  }
  
export default Login;