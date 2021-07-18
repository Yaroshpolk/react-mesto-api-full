import React from 'react';
import editAvatarBtn from '../images/btns/edit-avatar-btn.svg';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
    const {onEditAvatar,onAddPlace,onEditProfile,onCardClick,} = props;

    const currentUser = React.useContext(CurrentUserContext);

    return (
            <main className="main">
                <section className="profile">
                    <button className="profile__avatar-wrapper" onClick={onEditAvatar}>
                        <img src={editAvatarBtn} alt="редактировать"
                             className="profile__avatar-edit" />
                        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                    </button>

                    <div className="profile__info">
                        <div className="profile__info-item">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__btn profile__btn_edit" type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>

                    <button className="profile__btn profile__btn_add" type="button" onClick={onAddPlace}></button>
                </section>

                <section className="elements">
                    <div className="elements__list">{props.cards.map(card => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />))}</div>
                </section>
            </main>
    );
}

export default Main;