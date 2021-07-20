import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__item-trash ${isOwn && 'elements__item-trash_visible'}`
    );

    const isLiked = props.card.likes.some(i => i=== currentUser._id);
    const cardLikeButtonClassName = `elements__item-like ${isLiked && 'elements__item-like_active'}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (

            <div className="elements__item card">
                <img className="elements__item-image" alt={props.card.name}
                     src={props.card.link} onClick={handleClick}/>

                    <div className="elements__text">
                        <p className="elements__item-title">{props.card.name}</p>

                        <div className="elements__group">
                            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                            <p className="elements__like-count">{props.card.likes.length}</p>
                        </div>
                    </div>

                    <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
            </div>

    )
}

export default Card;