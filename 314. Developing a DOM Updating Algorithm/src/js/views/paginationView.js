import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    // Навешиваем обработчик события на контейнер пагинации
    this._parentElement.addEventListener('click', function (e) {
      // Ищем ближайшую кнопку пагинации, на которую кликнули
      const btn = e.target.closest('.btn--inline');
      if (!btn) return; // Если клик был мимо кнопок — выходим

      // Получаем номер страницы из data-атрибута кнопки
      const goToPage = +btn.dataset.goto;

      // Вызываем переданную функцию-обработчик и передаём ей номер страницы
      handler(goToPage);
    });
  }

  /* 5.  /* 
  Вот функция для отрисовки кнопок пагинации. 
  Сначала получаем текущую страницу (curPage) и общее количество страниц (numPages), 
     которое рассчитывается как общее количество результатов, делённое на количество результатов на одной странице.
  Далее идут условия, определяющие, какие кнопки нужно отрисовать:
  
     - Если мы на первой странице (curPage === 1), и всего страниц больше одной (numPages > 1),
       рисуем только кнопку "вперёд" (вперёд → Page 2).

     - Если мы на последней странице (curPage === numPages), и страниц больше одной,
       рисуем только кнопку "назад" (← Page N-1).

     - Если мы на какой-то средней странице (например, 2 из 5),
       рисуем и кнопку "назад", и кнопку "вперёд".

     - Если мы на первой странице, и других страниц нет (numPages === 1),
       кнопки вообще не отображаются — возвращаем пустую строку.
   Каждая кнопка содержит data-атрибут `data-goto`, в котором хранится номер страницы,
     на которую нужно перейти при клике. Этот атрибут затем считывается в `addHandlerClick()`.
  */
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
