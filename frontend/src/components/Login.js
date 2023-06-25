import React, {useState} from "react";
import useValidation from '../hooks/useValidation.js';

function Login({onLogin, isDisabled=false}) {
  const {values, handleChange, resetForm, errors, isValid} = useValidation();
    
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    } else {
      onLogin(values);
    }
  }

  return (
    <div className="login__container">
      <div className="login">
        <h3 className="login__title">Вход</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            name="email"
            type="email"
            id="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <span id="email-error" className="error">{errors.email || ''}</span>
          <input
            className="login__input"
            name="password"
            type="password"
            id="password"
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <span id="password-error" className="error">{errors.password || ''}</span>
          <button
            className="login__submit"
            type="submit">
              Войти
          </button>
        </form>       
      </div>
    </div>
  )
}

export default Login;