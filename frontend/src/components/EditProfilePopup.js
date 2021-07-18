import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm title="Редактировать профиль" name="edit" buttonText="Сохранить"
                       isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="form__field">
                <input className="form__input" id="name-input" type="text" placeholder="Имя" name="name" minLength="2"
                       maxLength="40" value={name || ""} onChange={handleChangeName} required />
                <span className="form__input-error name-input-error"></span>
            </label>

            <label className="form__field">
                <input className="form__input" id="about-input" type="text" placeholder="Немного о себе" name="about"
                       minLength="2" maxLength="200" value={description || ""} onChange={handleChangeDescription} required />
                <span className="form__input-error about-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;