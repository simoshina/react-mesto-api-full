import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value })
  } 

  return (
    <PopupWithForm onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen} title="Обновить аватар" button="Сохранить">
      <input id="avatar-input" type="url" name="avatar" className="popup__input" ref={avatarRef} placeholder="Ссылка на картинку" autoComplete="off" required />
      <span className="popup__error avatar-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;