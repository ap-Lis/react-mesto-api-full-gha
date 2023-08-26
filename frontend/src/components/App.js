import '../index.css'
import check from '../images/icons/check.svg';
import cross from '../images/icons/cross.svg';
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoToolTip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';

function App() {

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [infoIcon, setInfoIcon] = React.useState(check)
  const [infoText, setInfoText] = React.useState('')

  const navigate = useNavigate();
  
  React.useEffect(()=>{
    checkToken();
  }, [])

  React.useEffect(()=>{
    if(isLoggedIn){
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()])
        .then(([info, initialCards])=>{
          setCurrentUser(info);
          setCards(initialCards.data);
        })
        .catch((err)=>{console.log(err);});
    }
  }, [isLoggedIn])

  const handleEditAvatarClick = () => {
    setAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then(({data}) => {
      setCards((state) => state.map((c) => c._id === card._id ? data : c));
    }).catch((err)=>{console.log(err);});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err)=>{console.log(err);});
  }

  function handleUpdateUser(currentUser) {
    api.setUserInfo(currentUser).then(({data})=>{
      updateUserInfo(data);
    }).catch((err)=>{console.log(err);});
  }

  function handleRegister(userInfo) {
    auth.register(userInfo).then(()=>{
      setInfoIcon(check);
      setInfoText('Вы успешно зарегистрировались!');
      setInfoPopupOpen(true);
      navigate("/login");
    }).catch((err)=>{
      showErrorToolTip(err, 'Что-то пошло не так! Попробуйте ещё раз.');
    });
  }

  function handleLogin(userInfo) {
    auth.login(userInfo).then((res)=>{
      setLoggedIn(true);
      localStorage.setItem('jwt', res.token);
      setUserEmail(userInfo.email);
      navigate('/');
    }).catch((err)=>{
      showErrorToolTip(err, 'Неправильное имя пользователя и/или пароль.');      
    });
  }

  function showErrorToolTip(err, text) {
    setInfoIcon(cross);
    setInfoText(text);
    setInfoPopupOpen(true);
    console.log(err);
  }

  function handleUpdateAvatar(currentUser) {
    api.updateAvatar(currentUser.avatar).then(({data})=>{
      updateUserInfo(data);
    }).catch((err)=>{console.log(err);});
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card).then(({data})=>{
      setCards([data, ...cards]);
      closeAllPopups();
    }).catch((err)=>{console.log(err);});
  }

  function updateUserInfo(info) {
    setCurrentUser(info);
    closeAllPopups();
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');

    if (token){
      auth.checkToken(token).then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate('/');
        }
      }).catch((err)=>{console.log(err);});
    }
  }

  function clearUserInfo() {
    setLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail}
          loggedIn={isLoggedIn}
          onLogout={clearUserInfo}
        />
        <Routes>
          <Route path="/*" element={isLoggedIn ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />} /> 
          <Route path="/main" element={<ProtectedRouteElement
            element={Main}
            cards={cards}
            onEditAvatar = {handleEditAvatarClick}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn} />}
          />
          <Route path="/login" element={<Login onLogin = {handleLogin}/>} />
          <Route path="/register" element={<Register onRegister = {handleRegister}/>} />
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
        <ImagePopup card={selectedCard} isOpen={selectedCard} onClose = {closeAllPopups}/>
        <PopupWithForm title="Вы уверены?" buttonName="Да" name="submit"/>
        <InfoToolTip isOpen={isInfoPopupOpen} onClose = {closeAllPopups} text={infoText} icon={infoIcon}/>
        <Footer />
      </div>
  </CurrentUserContext.Provider>
  );
}

export default App;