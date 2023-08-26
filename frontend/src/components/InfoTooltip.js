function InfoToolTip({isOpen, onClose, icon, text}) {
    return (
        <div className={`popup popup_type_info ${isOpen &&`popup_is-opened`}`}> 
        {/* //isOpen &&  */}
            <div className="popup__window">
                <div className="popup__content">
                    <img className="popup__info-icon" src={icon} alt="Check"/> 
                    <p className='popup__info-text'>{text}</p>
                </div>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
            </div>
        </div>
    );
  }
  
export default InfoToolTip;