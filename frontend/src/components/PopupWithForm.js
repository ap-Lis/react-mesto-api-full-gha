function PopupWithForm({title, name, isOpen, onClose, buttonName, onSubmit, children}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? `popup_is-opened`: ``}`}>
            <div className="popup__window">
                <div className="popup__content">
                    <h2 className="popup__title">{title}</h2>
                    <form name={name} className="popup__form" onSubmit={onSubmit}>
                        {children}
                        <input className="popup__submit-button" type="submit" value={buttonName}/>
                    </form>
                </div>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
            </div>
        </div>
    );
  }
  
export default PopupWithForm;