import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [authData, setAuthData] = useState({ email: '', password: '' });

  function handleChange(e) {
    const {name, value} = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value 
    }));
  }

  function handleSubmit(e){
    e.preventDefault();
    handleRegister(authData)
  }
  
  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h2 className="auth__heading">Регистрация</h2>
      <input id="email-input" type="email" name="email" className="auth__input" placeholder="Email" onChange={handleChange} autoComplete="off" required />
      <input id="password-input" type="password" name="password" className="auth__input" onChange={handleChange} placeholder="Пароль" autoComplete="off" required />
      <button aria-label="Зарегистрироваться" type="submit" className="auth__button">Зарегистрироваться</button>
      <p className="auth__caption">Уже зарегистрированы? <Link className="auth__caption" to="/sign-in">Войти</Link></p>
    </form>
  )
}

export default Register;