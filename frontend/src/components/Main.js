import {useContext} from 'react';
import Card from './Card';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onLikeClick, onTrashClick, cards}) {
  
  const currentUser = useContext(CurrentUserContext);

  function handleCardView(card) {
    onCardClick(card);
  }
  
  function handleLike(card) {
    onLikeClick(card);
  }

  function handleDelete(card) {
    onTrashClick(card);
  }
  
  return (
    <>
      <main>            
        <section className="profile">
          <div className="profile__content">
            <div className="profile__avatar-container">
              <img
                className="profile__photo"
                src={currentUser.avatar}
                alt="Фото профиля"
              />
              <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
            </div>
            <div className="profile__item">
              <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button
                  type="button"
                  className="profile__edit-button"
                  aria-label="Кнока редактирования профиля"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="Кнока добавления карточки"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
            key={card._id}
            card={card}
            onCardClick={handleCardView}
            onLikeClick={handleLike}
            onTrashClick={handleDelete}/>
          ))}
        </section>
      </main>
      <Footer />
    </>
    
  )
}

export default Main