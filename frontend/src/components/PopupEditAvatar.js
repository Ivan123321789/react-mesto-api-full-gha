import {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onEditAvatar}) {
  
  const ref = useRef();
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onEditAvatar({
      avatar: ref.current.value
    });
   
  }
  
  useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватвр'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        ref={ref}
        required
        type="url"
        id="avatarLink"
        name="avatar"
        className="popup__input"
        placeholder="Ссылка на новый аватар"
      />
      <span id="avatarLink-error" className="error"></span>
  </PopupWithForm>

  );
}
export default EditAvatarPopup;