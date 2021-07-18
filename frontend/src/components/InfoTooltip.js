import React from 'react';
import unionYes from '../images/Unionyes.svg';
import unionNo from '../images/Unionno.svg';
import { AppContext } from "../contexts/AppContext";

function InfoTooltip (props) {

    const data = React.useContext(AppContext);

    return (
        <section className={`popup popup_infotool ${props.isOpen && 'popup_opened'}`} >
            <div className='popup__container_infotool'>
                <button className='popup__close-btn' type='button' onClick={props.onClose}></button>
                <img src={data.isRegSuccess ? unionYes : unionNo}  className='popup__union-image' alt='Результат'/>
                <h2 className='popup__title_infotool'>
                    {data.isRegSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </section>
    );
}

export default InfoTooltip;