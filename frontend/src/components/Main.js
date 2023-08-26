import React from 'react';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
          <button className="profile__avatar" aria-label="аватар" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
          <div className="profile__profile-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}/>
        </section>
        <section className="elements" aria-label="галерея">
          {
            cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)
          }
        </section>
    </main>
  );
}
  
export default Main;