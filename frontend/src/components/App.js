/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { api } from '../utils/Api';
import { auth } from '../utils/Auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardsData, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();
  
  useEffect(() => {
    if (loggedIn) {
      history.push("/");
      Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([data, cardList]) => {
        setCurrentUser(data);
        setCards(cardList)})
      .catch(err => console.log(err))
    };
  }, [history, loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen) 
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen) 
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
    setIsImagePopupOpen(!isImagePopupOpen) 
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false)
  }

  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()})
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.editUserPic(data.avatar)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()})
    .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
    .then(res => {
      setCards([res, ...cardsData]);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  function handleLogin(data) {
     auth.login(data.email, data.password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          tokenCheck()
        }
      })
      .catch((err) => {
        console.log(err)
        setIsInfoToolTipOpen(true);
        setIsSuccess(false)
      });
  }

  function handleRegister(data) {
    return auth.register(data.email, data.password)
      .then(() => {
        history.push('/sign-in');
        setIsInfoToolTipOpen(true);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err)
        setIsInfoToolTipOpen(true);
        setIsSuccess(false)
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then(res => {
        setLoggedIn(true);
        history.push("/");
        setEmail(res.email)
      })
      .catch(err => console.log(err));
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} handleLogout={handleLogout}/>
        <Switch>
          <ProtectedRoute 
            exact path="/"
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cardsData}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
            component={Main} />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route>
          { loggedIn ? <Redirect exact to="/" /> : <Redirect to="/sign-in" /> }
          </Route>
        </Switch>
        { loggedIn && <Footer />}
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} isSuccess={isSuccess}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;