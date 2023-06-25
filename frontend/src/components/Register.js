import {NavLink} from "react-router-dom";
import useValidation from '../hooks/useValidation.js';

function Register({onRegister, isDisabled=false}) {
  const {values, handleChange, errors, isValid} = useValidation();
    
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (       
    <div className="login__container">
      <div className="login">
        <h3 className="login__title">Регистрация</h3>
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
            minLength='8'
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <span id="password-error" className="error">{errors.password || ''}</span>      
          <button
            className={`login__submit ${isDisabled && 'popup__button-submit_disabled'}`}
            type="submit"
            disabled={!isValid}>
              Зарегистрироваться
          </button>
        </form>  
        <div className="login__signup">
          <p className="signup__ask">Уже зарегистрированы? </p>
          <NavLink className="signup__link" to="/signin">Войти</NavLink>
        </div>
      </div>
    </div>   
  )
}

export default Register;