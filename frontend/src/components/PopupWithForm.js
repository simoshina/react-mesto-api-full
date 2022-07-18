function PopupWithForm({ isOpen, onClose, title, button, children, onSubmit }) {
  const activePopup = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup ${activePopup}`} onClick={onClose}>
      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <form className="popup__form" onSubmit={onSubmit}>
          <button type="button" aria-label="Закрыть" className="popup__exit-button" onClick={onClose}/>
          <h2 className="popup__heading">{title}</h2>
          {children} 
          <button aria-label={button} type="submit" className="popup__save-button">{button}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;