import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

function ImagePopup({card, onClose}) {
  usePopupClose(card, onClose);
  return (
    <div className={`popup popup_open-image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <div className="popup__image-form">
          <button
            type="button"
            className="popup__close-icon"
            id="cardImageClose"
            onClick={onClose}
          ></button>
          <img
            src={card ? card.link : ''}
            alt={card ? card.name : ''}
            className="popup__image"
          />
          <h2 className="popup__subtitle-image">{card ? card.name : ''}</h2>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup