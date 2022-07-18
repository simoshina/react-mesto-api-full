import { useState } from "react";

function Login({ handleLogin }) {
  const [authData, setAuthData] = useState({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(authData);
  } 

  function handleChange(e) {
    const {name, value} = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value 
    }));
  }

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h2 className="auth__heading">Вход</h2>
      <input id="email-input" type="email" name="email" className="auth__input" placeholder="Email" autoComplete="off" required onChange={handleChange}/>
      <input id="password-input" type="password" name="password" className="auth__input" placeholder="Пароль" autoComplete="off" required onChange={handleChange}/>
      <button aria-label="Войти" type="submit" className="auth__button">Войти</button>
    </form>
  );
}

export default Login;