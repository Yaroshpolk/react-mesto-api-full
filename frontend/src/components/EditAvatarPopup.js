import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {

    const avatarInput = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarInput.current.value,
        },() => {
            avatarInput.current.value = "";
        });
    }

    return(
        <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить"
                       isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="form__field">
                <input className="form__input" id="avatar-source" type="url" placeholder="Ссылка на аватар" name="src"
                       ref={avatarInput} required />
                <span className="form__input-error avatar-source-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;