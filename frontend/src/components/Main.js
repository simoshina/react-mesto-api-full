import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <span onClick={onEditAvatar} className="profile__edit-pic" />
        <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button onClick={onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button" />
          <p className="profile__subtitle">{currentUser.about}</p> 
        </div>
        <button onClick={onAddPlace} type="button" aria-label="Добавить" className="profile__add-button" />
      </section>
      <section className="elements">
        {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />))}
      </section>
    </main>
  );
}

export default Main;