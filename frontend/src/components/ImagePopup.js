import React from 'react';

function ImagePopup(props) {
    return (
        <section className={`popup popup_view ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
                <img className="popup__img" alt={props.card.name}
                     src={`${props.card.link}`} />
                <p className="popup__subimg">{props.card.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;