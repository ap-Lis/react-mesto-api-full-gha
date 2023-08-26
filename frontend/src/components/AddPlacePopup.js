import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
            
        onAddPlace({
            name,
            link,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handlePlaceChange(e) {
        setLink(e.target.value);
    }

    React.useEffect(()=>{
        setName('');
        setLink('');
      }, [isOpen])
   
    return (
        <PopupWithForm title="Новое место" name="add" buttonName="Создать" isOpen = {isOpen} onClose = {onClose} onSubmit={handleSubmit}>
            <label className = "popup__field">
                <input className="popup__input popup__input_value_place-title" type="text" name="place_title" id="place-title-input" placeholder="Название" required minLength="2" maxLength="30" value={name || ''} onChange={handleNameChange}/>
                <span className="popup__error" id="place-title-input-error"></span>
            </label>
            <label className = "popup__field">
                <input className="popup__input popup__input_value_place-url" type="url" name="place_url" id="place-url-input" placeholder="Ссылка на картинку" required value={link || ''} onChange={handlePlaceChange}/>
                <span className="popup__error" id="place-url-input-error"></span>
            </label>
        </PopupWithForm>
    );
  }
  
export default AddPlacePopup;