import React from 'react';

function PopupWithForm(props) {

    return(
            <section className={`popup popup_${props.name} ${props.isOpened && 'popup_opened'}`}>
                <div className="popup__container">
                    <button className="popup__close-btn" type="button" onClick={props.onClose}></button>

                    <h3 className="popup__title">{props.title}</h3>
                    <form className="form" name={`${props.name}Form`} onSubmit={props.onSubmit} >
                        {props.children}
                        <button className="form__submit" type="submit">{props.buttonText}</button>
                    </form>
                </div>
            </section>
    );
}

export default PopupWithForm;