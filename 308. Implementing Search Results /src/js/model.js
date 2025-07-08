// Это глобальное хранилище состояния приложения.

import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  /*  5
  =============
  - хранить мы результат будем в этом объекте. плюс сохраним еще саму строку поиска. 
  */
  search: {
    query: '',
    results: [],
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

/*  4. 
====================
- Чтобы найти на сервере допустим все пиццы нам нужно перейти по этой ссылке 
https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza тогда сервер вернет нам массив с пиццами. 
- получим массив и переберем его. Создадим новый массив с объектами. 
- результат поиска сохраним в наш объект стейт
*/
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
