import {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import PopupEditProfile from './PopupEditProfile';
import PopupAddPlace from './PopupAddPlace';
import PopupEditAvatar from './PopupEditAvatar';
import avatar from '../images/profile-photo.jpg';
import imageSuccess from '../images/success.svg';
import imageFail from '../images/fail.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import * as auth from '../utils/auth.js';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({name: "Юрий Гагарин", about: "Первый человек в космосе", avatar: avatar});
  const [cards, setCards] = useState([]);

  const [isPopupEditProfileOpen, setIsPopupEditProfileOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsPopupEditProfileOpen(true);
  }

  const [isPopupAddPlaceOpen, setIsPopupAddPlaceOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setIsPopupAddPlaceOpen(true);
  }

  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = useState(false);  
  const handleEditAvatarClick = () => {
    setIsPopupEditAvatarOpen(true); 
  }

  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [message, setMessage] = useState('');
  const [isRegSuccess, setIsRegSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  function handleLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCardApi(card._id)
    .then((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsPopupEditAvatarOpen(false);
    setIsPopupEditProfileOpen(false);
    setIsPopupAddPlaceOpen(false);
    setSelectedCard(null); 
  }

  function handleEditProfile(data) {
    setIsLoading(true);
    api.changeProfile(data)
    .then ((newUserInfo) => {
      console.log(newUserInfo);
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => setIsLoading(false));
  }

  function handleEditAvatar(data) {
    setIsLoading(true);
    api.changeAvatar(data)
    .then ((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => setIsLoading(false));
  }

  function handleAddPlace(data) {
    setIsLoading(true);
    api.postCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => setIsLoading(false));
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  function handleRegister(registerData) {
    auth.register(registerData)
    .then((res) => {
      console.log(res);
      console.log(res.data.email);
      setIsRegSuccess(true);
      setInfoTooltipImage(imageSuccess);
      setMessage('Вы успешно зарегистрировались!');
      navigate('/signin');
    })
    .catch((err) => {
      console.log(err);
      setIsRegSuccess(false);
      setInfoTooltipImage(imageFail);
      setMessage('Что-то пошло не так! Попробуйте еще раз!');
    })
    .finally(()=> setIsTooltipPopupOpen(true));
  }

  function handleLogin(userData) {
    auth.authorize(userData)
     .then((res) => {
       console.log(res);
       console.log(userData.email);
       localStorage.setItem('jwt', res.token);
       setIsLoggedIn(true);
       setUserEmail(userData.email); 
       navigate('/');  
     })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      setInfoTooltipImage(imageFail);
      setMessage('Что-то пошло не так! Попробуйте еще раз!');
      setIsTooltipPopupOpen(true);
    })
  }

  function handleCheckToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);
          navigate('/');
        }       
      })
      .catch((err) => {console.log(`Ошибка: ${err}`)});
    }
  };

  function closePopup() {
    setIsTooltipPopupOpen(false);
  }

  useEffect(() => {
      handleCheckToken();
  }, [])
  
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUser(), api.getCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);    
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
      });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
      <Header userEmail={userEmail} handleSignOut={handleSignOut} />
      <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />}/>         
          <Route path="/signup" element={<Register onRegister={handleRegister} />}/>          
          <Route exact path='/' element={
            <ProtectedRoute loggedIn={isLoggedIn}
              element={Main} 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onLikeClick={handleLikeClick}
              onTrashClick={handleCardDelete}
              cards={cards}
              /> } />
        </Routes>
        <PopupEditProfile
          isLoading={isLoading}
          isOpen={isPopupEditProfileOpen}
          onClose={closeAllPopups}
          onEditProfile={handleEditProfile}
        />
        <PopupAddPlace
          isLoading={isLoading} 
          isOpen={isPopupAddPlaceOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupEditAvatar 
          isLoading={isLoading}
          isOpen={isPopupEditAvatarOpen}
          onClose={closeAllPopups}
          onEditAvatar={handleEditAvatar}
        />                    
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closePopup}
          image={infoTooltipImage}
          message={message}
          isRegSuccess={isRegSuccess}
        />               
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
