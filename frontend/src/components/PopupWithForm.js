import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

function PopupWithForm({name, title, isOpen, onClose, children, buttonText, buttonTextLoading, onSubmit, isLoading, isDisabled=false}) {
  
  usePopupClose(isOpen, onClose);
  
  function handleChangeButtonText() {
    if (!isLoading) {
      return buttonText;
    } else {
      return buttonTextLoading;
    }
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__content">
        <form 
          className={`popup__form popup__form_${name}`} 
          name={`${name}-form`}
          onSubmit={onSubmit} 
          noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__button-submit ${isDisabled && 'popup__button-submit_disabled'}`}
            aria-label="Кнопка сохранения"
            disabled={isDisabled}
            >{handleChangeButtonText()}</button>
          <button
            type="button"
            className="popup__close-icon"
            aria-label="Кнопка закрытия"
            onClick={onClose}
          ></button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm