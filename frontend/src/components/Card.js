import React from 'react';
import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onLikeClick, onTrashClick}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `elements__delete ${!isOwn && 'elements__delete_hidden'}`
  ); 

  const LikesButtonClassName = (
    `elements__like ${isLiked && 'elements__like_active'}`
  );

  function handleClickCard() {
    onCardClick(card);    
  }

  function handleClickTrach() {
    onTrashClick(card)
  }

  function handleClickLike() {
    onLikeClick(card)
  }

  return (
    <div className="elements__element">
      <img 
        className="elements__image" 
        onClick={handleClickCard}
        src={card.link} 
        alt={card.name} />
      <div className="elements__element-title">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-container">
          <button
            className={LikesButtonClassName}
            type="button"
            aria-label="Кнопка like"
            onClick={handleClickLike}
          ></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Кнока Delete"
        onClick={handleClickTrach}
      ></button>
    </div>
  )
}
export default Card;