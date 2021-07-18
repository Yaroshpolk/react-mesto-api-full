import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login';
import Register from './Register';

import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/api";
import * as auth from '../utils/auth';
import CurrentUserContext from "../contexts/CurrentUserContext";
import { AppContext } from '../contexts/AppContext';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({isOpen : false});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isRegSuccess, setIsRegSuccess] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userData, setUserData] = React.useState({
        email: '',
        password: '',
    });

    const history = useHistory();

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then(cardList => {
                setCards(cardList);
            })
            .catch((err)=> {
                console.log(err)
            })
    }, []);

    React.useEffect(() => {
        checkToken();
    }, []);

    function handleInfoTooltipClick() {
        setIsTooltipPopupOpen(true);
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((elem) => elem !== card);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({isOpen : false});
        setIsTooltipPopupOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard({
            isOpen: true,
            link: card.link,
            name: card.name
        });
    }

    function handleUpdateUser({name, about}) {
        api.editUserInfo({name, about})
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleUpdateAvatar({avatar}) {
        api.changeAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleRegister ({ email, password }, onSuccess)  {
        auth.register({ email, password })
            .then((data) => {
                setUserData({ email: data.email });
                setIsRegSuccess(true);
                handleInfoTooltipClick();
                onSuccess();
                history.push('/signin');
            })
            .catch((err) => {
                console.log(err);
                setIsRegSuccess(false);
                handleInfoTooltipClick();
            });
    }

    function handleLogin ({ email, password }, onSuccess) {
        auth
            .authorize({ email, password })
            .then(({ token }) => {
                if ({ token }) {
                    localStorage.setItem('jwt', token);
                }
                checkToken();
                onSuccess();
            })
            .catch((err) => {
                console.log(err);
                handleInfoTooltipClick();
            });
    }

    function checkToken () {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        history.push('/');
                        console.log(res.data)
                        setUserData({ email: res.data.email });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function signOut () {
        localStorage.removeItem('jwt');
        history.push('/signin');
        setLoggedIn(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <AppContext.Provider
                value={{
                    userData: userData,
                    loggedIn: loggedIn,
                    isRegSuccess: isRegSuccess,
                    handleLogin: handleLogin,
                }}>
          <div className="content">
            <Header onSignOut={signOut} />
            <Switch>
                <Route path="/signup">
                    <Register handleRegister={handleRegister} />
                </Route>
                <Route path="/signin">
                    <Login handleLogin={handleLogin} />
                </Route>
                <ProtectedRoute
                    exact
                    path='/'
                    loggedIn={loggedIn}
                    component={Main}
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Route path=''>
                    {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
                </Route>
            </Switch>
            <Footer />

              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

              <PopupWithForm title="Вы уверены?" name="popup_delete" buttonText="Да" onClose={closeAllPopups} />

              <ImagePopup card={selectedCard} isOpen={selectedCard.isOpen} onClose={closeAllPopups} />

              <InfoTooltip isOpen={isTooltipPopupOpen} onClose={closeAllPopups} isRegSuccess={false} />
          </div>
        </AppContext.Provider>
        </CurrentUserContext.Provider>
  );
}

export default App;
