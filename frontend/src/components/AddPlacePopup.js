import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangelink(e) {
    setLink(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name,link });
  }

  return (
    <PopupWithForm onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen} title="Новое место" button="Создать">
      <input id="caption-input" type="text" name="name" className="popup__input" onChange={handleChangeName} value={name} placeholder="Название" autoComplete="off" required minLength={2} maxLength={30} />
      <span className="popup__error caption-input-error" />
      <input id="link-input" type="url" name="link" className="popup__input" onChange={handleChangelink} value={link} placeholder="Ссылка на картинку" autoComplete="off" required />
      <span className="popup__error link-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;