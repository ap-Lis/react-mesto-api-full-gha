function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_picture  ${isOpen ? `popup_is-opened`: ``}`}>
      <div className="popup__window">
        <figure className="popup__image-container">
          <img className="popup__image" src={card ? card.link : 'https://helios-i.mashable.com/imagery/articles/04i1KeWXNed98aQakEZjeOs/hero-image.fill.size_1248x702.v1623362896.jpg'} alt={card ? card.name : 'pepe'}/>
          <figcaption className="popup__image-title">{card ? card.name : 'pepe'}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}/>
      </div>
    </div>
  );
}
  
export default ImagePopup;