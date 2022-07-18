import successImg from '../images/success.svg';
import errorImg from '../images/error.svg';

function InfoToolTip({ isOpen, isSuccess, onClose }) {
  const activePopup = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup ${activePopup}`} onClick={onClose}>
      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <div className="popup__form">
          <button type="button" aria-label="Закрыть" className="popup__exit-button" onClick={onClose}/>
          <img className="popup__checkmark" alt='Уведомление' src={isSuccess ? successImg : errorImg} />
          <h2 className="popup__auth">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoToolTip;