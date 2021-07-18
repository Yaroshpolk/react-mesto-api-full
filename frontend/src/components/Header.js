import React from 'react';
import logo from "../images/logo/logo-light.svg";
import {Link, Route} from "react-router-dom";
import { AppContext } from '../contexts/AppContext';

function Header(props) {

    const value = React.useContext(AppContext);

    return (
        <header className="header">
            <img src={logo} alt="Логотип Место Россия" className="header__logo" />
            <div className="info">
                <Route path="/signin">
                    <Link className="header__link" to="/signup" >Зарегистрироваться</Link>
                </Route>
                <Route path="/signup">
                    <Link className="header__link" to="/signin" >Войти</Link>
                </Route>
                {value.loggedIn && (
                    <span className='header__user-email'>{value.userData.email}</span>
                )}
                <Route exact path='/'>
                    <Link onClick={props.onSignOut} className='header__link' to='/signin'>
                        Выйти
                    </Link>
                </Route>
            </div>
        </header>
    );
}

export default Header;