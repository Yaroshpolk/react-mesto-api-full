import React from "react";
import useFormAndValidation from '../utils/useFormAndValidation.js';

function Login(props) {

    const { values, handleChange, errors, isValid, setValues } =
        useFormAndValidation();

    const { email, password } = values;

    function handleSubmit (e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        isValid &&
        props.handleLogin({ email, password }, () => {
            setValues({});
        });
    }

    // Времени мало, кастомную валидацию форм доделаю позже

    return (
        <section className='auth'>
            <h2 className='auth__title'>Вход</h2>
            <form className='auth__form' name='signInForm' onSubmit={handleSubmit}>

                <div className="inputs">
                    <label className="auth__form-field">
                        <input className="auth__form-input" id="email" type="Email" placeholder="Email"
                               name="email" minLength='2' maxLength='20' required value={email || ''} onChange={handleChange}/>

                    </label>

                    <label className="auth__form-field">
                        <input type='password' className='auth__form-input' id='password' name='password' minLength='8'
                               maxLength='20' placeholder='Пароль' required value={password || ''} onChange={handleChange}/>

                    </label>
                </div>

                <button className='auth__form-submit' type='submit'>Войти</button>
            </form>
        </section>
    );
}

export default Login;