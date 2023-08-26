import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from '../components/PopupWithForm.js';

function EditProfilePopup({onUpdateUser, isOpen, onClose}) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleJobChange(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    return (
        <PopupWithForm title="Редактировать профиль" name="edit" buttonName="Сохранить" isOpen = {isOpen} onClose = {onClose} onSubmit={handleSubmit} >
            <label className = "popup__field">
                <input className="popup__input popup__input_value_name" type="text" name="name" id="name-input" placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange}/>
                <span className="popup__error" id="name-input-error"></span>
            </label>
            <label className = "popup__field">
                <input className="popup__input popup__input_value_job" type="text" name="job" id="job-input" placeholder="Род занятий" required minLength="2" maxLength="200" value={description || ''} onChange={handleJobChange}/>
                <span className="popup__error" id="job-input-error"></span>
            </label>
        </PopupWithForm>
    );
  }
  
export default EditProfilePopup;