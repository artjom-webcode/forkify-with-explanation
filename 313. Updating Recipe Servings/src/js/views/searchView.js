/*  1 
===========
- этот класс отвечает за форму с с инпутом и поиском. 
- тут три метода getQuery возвращает то что мы вбилив инпут
- _clearInput - очищает инпут
- addHandlerSearch мы сабмите формы запускает функцию которую мы ему передадим
*/

class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
