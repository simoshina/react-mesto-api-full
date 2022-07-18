import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name, about});
  } 

  return (
    <PopupWithForm onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen} title="Редактировать профиль" button="Сохранить">
      <input id="name-input" type="text" name="name" className="popup__input" onChange={handleChangeName} value={name || ''} placeholder="Имя" autoComplete="off" required minLength={2} maxLength={40} />
      <span className="popup__error name-input-error" />
      <input id="about-input" type="text" name="about" className="popup__input" onChange={handleChangeDescription} value={about || ''} placeholder="О себе" autoComplete="off" required minLength={2} maxLength={200} />
      <span className="popup__error about-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;