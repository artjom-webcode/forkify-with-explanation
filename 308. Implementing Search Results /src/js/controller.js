import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    /* 2. */
    recipeView.renderError();
  }
};

/* 
3.
=============
- эта функция отвечает за подгрузку данных с сервера и отрисовку результата на странице. 
- сначала запускаем спинер
- query - придет то что мы вбили в инпут.
- await model.loadSearchResults(query); - здесь мы запускаем функцию для подгрузки данных с сервера
- 

*/
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
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  /* 
  2. 
  - Здаесы мы вызываем эту функицию и теперь на форме у нас висит слушатель
  - мы передали функцию controlSearchResults. 
  - на самом деле это строка просто передает нашу функцию в модуль searchView. там у нас прописан слушатель для отправки формы.  
  */
  searchView.addHandlerSearch(controlSearchResults);
};

init();
