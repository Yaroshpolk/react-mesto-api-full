import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ name, link },
            () => {
                setName('');
                setLink('');
            });
    }

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }


    return (
        <PopupWithForm title="Новое место" name="add" buttonText="Сохранить"
                       isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="form__field">
                <input className="form__input" id="title-input" type="text" placeholder="Название" name="name"
                       minLength="2" maxLength="30" onChange={handleChangeName} value={name} required />
                <span className="form__input-error title-input-error"></span>
            </label>

            <label className="form__field">
                <input className="form__input" id="source-input" type="url" placeholder="Ссылка на картинку"
                       name="link" onChange={handleChangeLink} value={link} required />
                <span className="form__input-error source-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;