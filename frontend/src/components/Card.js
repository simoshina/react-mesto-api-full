import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useContext } from 'react';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `${isOwn ? 'element__delete-button' : 'element__delete-button_disabled'}`; 
  
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;
  
  function handleClick() {
    onCardClick(card);
  } 

  function handleLikeClick() {
    onCardLike(card);
  } 

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img className="element__photo" alt={card.name} src={card.link} onClick={handleClick}/>
      <button type="button" aria-label="Удалить" onClick={handleDeleteClick} className={cardDeleteButtonClassName} />
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2> 
        <div className="element__like"> 
          <button type="button" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}