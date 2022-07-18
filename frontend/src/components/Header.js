import logo from '../images/logo.svg';
import { Route, Link, Switch } from 'react-router-dom';

function Header({ email, handleLogout }) {

  return (
    <header className="header">
      <img className="header__logo" alt="лого" src={logo} />
      <div className='header__nav'>
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/">
          <p className="header__email">{email}</p>
          <Link to="/sign-in" onClick={handleLogout} className="header__link">Выйти</Link>
        </Route>
      </Switch>
      </div>
    </header>
  );
}

export default Header;