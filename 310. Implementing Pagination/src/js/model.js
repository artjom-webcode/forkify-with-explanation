import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

/* 
1. Когда пользователь вбил в инпут пицца то в свойство state.search.results приходит массив со всеми пиццами на сервере. 
Сначала мы создали функицю которая возвращает массив допустим с пиццами. Колл-во пицц зависит от того сколько мы хотим отображать на странице. Эта функция возвращает только часть рецептов (например, пицц) из общего массива результатов поиска.
Мы хотим показывать, например, по 10 рецептов на страницу.
В зависимости от выбранной страницы (page), считаем индекс начала и конца:
   - Если page = 1, то от 0 до 10 (не включая 10)
   - Если page = 2, то от 10 до 20 и т.д.
slice(start, end) возвращает нужный "кусок" из общего массива.
Нужно помнить функция возвращает массив с пиццами 
*/
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;

  return state.search.results.slice(start, end);
};
