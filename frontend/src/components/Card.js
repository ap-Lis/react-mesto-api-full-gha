import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  const handleCardLike = () => {
    props.onCardLike(props.card);
  }

  const handleCardDelete = () => {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleCardClick}/>
      <div className="element__info">
        <h2 className="element__label">{props.card.name}</h2>
        <div className="element__like-container">
          <button className={`element__like-button ${isLiked && `element__like-button_enabled`}`} type="button" aria-label="Лайк" onClick={handleCardLike} />
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button className={`element__delete-button ${isOwn && `element__delete-button_enabled`} type="button" aria-label="Лайк"`}  onClick={handleCardDelete}/>
   </article>
  );
}
  
export default Card;