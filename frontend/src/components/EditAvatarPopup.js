import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
    const avatarRef = React.createRef();

    function handleSubmit(e) {
      e.preventDefault();
      
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }

    React.useEffect(()=>{
      avatarRef.current.value= '';
    }, [avatarRef, isOpen])

    return (
        <PopupWithForm title="Обновить автар" name="avatar" buttonName="Сохранить" isOpen={isOpen} onClose = {onClose} onSubmit={handleSubmit}>
            <label className = "popup__field">
                <input ref={avatarRef} className="popup__input popup__input_value_avatar-url" type="url" name="avatar_url" id="avatar-url-input" placeholder="Ссылка на картинку" required />
                <span className="popup__error" id="avatar-url-input-error"></span>
            </label>
        </PopupWithForm>
    );
  }
  
export default EditAvatarPopup;