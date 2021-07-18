export default function inProcessMsg(element, inProcess) {
    inProcess ? element._popupSubmitBtn.textContent = 'Сохранение...' : element._popupSubmitBtn.textContent = 'Сохранить';
}