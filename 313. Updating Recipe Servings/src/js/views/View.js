import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /* 
3. Метод render принимает данные (например, массив с пиццами).
   - Сначала проверяется, что данные существуют и не пустые.
   - Если данные пустые, вызывается renderError() и показывается сообщение об ошибке.
   - Если всё хорошо, сохраняем данные в this._data.
   - Затем вызываем _generateMarkup(), который создает HTML-разметку на основе данных.
   - После этого очищаем родительский элемент с помощью _clear().
   - И наконец вставляем сгенерированную разметку в DOM методом insertAdjacentHTML().
*/
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
