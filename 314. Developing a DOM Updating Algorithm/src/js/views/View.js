import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

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

  /* 
  -----------------------
  1
  ----------------------- 
  Пишем метод update который смогут использовать все экземляры классов. 
  */

  update(data) {
    // Сохраняем новые данные в свойство экземпляра класса,
    // чтобы другие методы могли работать с актуальными данными
    // data - это рецепт из объекта state мы его подгрузили с сервера из hash строки
    this._data = data;

    // Генерируем HTML-разметку на основе новых данных,
    // вызывая метод, который строит шаблон для отображения
    const newMarkup = this._generateMarkup();

    // Создаём виртуальный DOM-фрагмент из строки разметки.
    // Это как "пробный" DOM, который существует только в памяти,
    // и в реальный документ не вставляется.
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Извлекаем из виртуального DOM все элементы (теги),
    // превращая коллекцию в обычный массив для удобной итерации
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // Аналогично извлекаем все текущие элементы из родительского элемента
    // (то есть из реального DOM), с которыми будем сравнивать
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Перебираем все новые элементы по порядку,
    // чтобы сравнить их с соответствующими текущими элементами
    newElements.forEach((newEl, i) => {
      // Текущий элемент из реального DOM
      const curEl = curElements[i];

      // Метод isEqualNode сравнивает узлы целиком:
      // возвращает true, если элементы идентичны по структуре, тексту и атрибутам.
      // Здесь проверяем:
      // 1) Что новый и текущий элемент не одинаковы
      // 2) Что у нового элемента есть текстовый узел и он не пустой
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // Если условия выполнены, значит текст внутри элемента изменился,
        // поэтому обновляем текстовое содержимое текущего элемента,
        // не затрагивая остальной HTML-разметки и вложенных элементов.
        curEl.textContent = newEl.textContent;
      }

      // Проверяем снова, что элементы не совпадают,
      // чтобы обновить атрибуты (например, классы, data-атрибуты и т.п.)
      if (!newEl.isEqualNode(curEl)) {
        // Перебираем все атрибуты нового элемента
        Array.from(newEl.attributes).forEach(attr =>
          // Для каждого атрибута обновляем или добавляем его
          // в текущем DOM-элементе
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
