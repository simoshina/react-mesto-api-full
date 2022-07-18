function ImagePopup({ isOpen, onClose, card }) {
  const activePopup = isOpen ? 'popup_opened' : '';

  return (
    <div id="photoView" className={`popup ${activePopup}`} onClick={onClose}>
      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <div className="popup__image-view">
          <img className="popup__image" alt={card.name} src={card.link}/>
          <p className="popup__caption">{card.name}</p>
          <button id="photoViewClose" type="button" aria-label="Закрыть" className="popup__exit-button" onClick={onClose}/>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;