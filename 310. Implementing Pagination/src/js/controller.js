import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // recipeView.render(model.state.recipe);
  } catch (err) {
    /* 2. */
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);

    /* 2.
   Здесь мы вызываем эту функцию. И получится в render передадим массив с 10 пиццами. render отвечает за отрисовку на странице. 
    */
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    /* 
    4. 
    Теперь нам надо отрисовать кнопки внизу. Мы передаем функции весь массив с пиццами. И на основе него будет понятно какие кнопки и с какими цифрами отоброжать. 
    
    */
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

/* эта функци отвечает какие кнопки буду отображаться на странице.  */
const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  /* тут мы навешиваем слушатель */
  paginationView.addHandlerClick(controlPagination);
};

/* 1. При загрузки приложения запускается эта функция. */
init();
