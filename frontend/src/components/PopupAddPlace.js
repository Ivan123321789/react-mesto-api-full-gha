import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

function PopupAddPlace({isLoading, isOpen, onClose, onAddPlace}) {
  const {values, handleChange, resetForm, errors, isValid} = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  };

  useEffect(() => {
    resetForm({}, {}, true)
  }, [resetForm, isOpen]);
  
  return (
    <PopupWithForm
    name='place'
    title='Новое место'
    buttonText='Создать'
    buttonTextLoading='Сохранение...'
    isOpen={isOpen}
    onClose={onClose}
    isLoading={isLoading}
    isDisabled={!isValid || isLoading}
    onSubmit={handleSubmit}>
      <input
        required
        type="text"
        id="placeName"
        name="name"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.name || ''} 
        onChange={handleChange}
      />
      <span id="placeName-error" className="error">{errors.name || ''}</span>
      <input
        required
        type="url"
        id="imageLink"
        name="link"
        className="popup__input"
        placeholder="Ссылка на изображение"
        value={values.link || ''} 
        onChange={handleChange}
      />
      <span id="imageLink-error" className="error">{errors.link || ''}</span>
    </PopupWithForm>
  )
}
export default PopupAddPlace;