import {useContext, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation.js';

function PopupEditProfile({isLoading, isOpen, onClose, onEditProfile}) {
  const {values, handleChange, resetForm, errors, isValid} = useValidation();
  const currentUser = useContext(CurrentUserContext);
  
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true)
    }
    },[currentUser, resetForm, isOpen]
  );
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onEditProfile(values);
  };

  return (
    <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            buttonTextLoading='Сохранение...'
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={onClose}
            isDisabled={!isValid || isLoading}
            onSubmit={handleSubmit}>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="popup__input"
              minLength="2"
              maxLength="40"
              value={values.name || ''}
              placeholder="Имя"
              onChange={handleChange}
            />
            <span id="name-error" className="error">{errors.name || ''}</span>
            <input
              required
              type="text"
              id="about"
              name="about"
              className="popup__input"
              minLength="2"
              maxLength="200"
              value={values.about || ''}
              placeholder="О себе"
              onChange={handleChange}
            />
            <span id="about-error" className="error">{errors.about || ''}</span>
          </PopupWithForm>
  );
}

export default PopupEditProfile;