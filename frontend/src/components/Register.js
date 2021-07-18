import React from "react";
import { Link } from 'react-router-dom';
import useFormAndValidation from '../utils/useFormAndValidation.js';

function Register (props) {

    const { values, handleChange, errors, isValid, setValues } =
        useFormAndValidation();


    const { email, password } = values;

    function handleSubmit (e) {
        e.preventDefault();
        isValid &&
        props.handleRegister({ email, password }, () => {
            setValues({});
        });
    };

    // Времени мало, кастомную валидацию форм доделаю позже

    return (
        <section className='signIn'>
            <section className='auth'>
                <h2 className='auth__title'>Регистрация</h2>
                <form className='auth__form' name='signUpForm' onSubmit={handleSubmit}>

                    <div className="inputs">
                        <label className="auth__form-field">
                            <input className="auth__form-input" id="email" type="Email" placeholder="Email"
                                   name="email" minLength='2' required value={email || ''} onChange={handleChange} />
                        </label>

                        <label className="auth__form-field">
                            <input type='password' className='auth__form-input' id='password' name='password' minLength='8'
                                    placeholder='Пароль' required value={password || ''} onChange={handleChange}/>
                        </label>
                    </div>

                    <button className='auth__form-submit' type='submit'>Зарегистрироваться</button>
                    <Link className='auth__link' to='/signin'>Уже зарегистрированы? Войти</Link>
                </form>
            </section>
        </section>
    );
}

export default Register;