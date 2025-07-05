// Так мы испортируем все именные перемены в объект model
import * as model from './model.js';

// Так мы импортируем весь файл. Это будет объект с методами и свойствами.
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    /* 2. читаем хаш */
    const id = window.location.hash.slice(1);
    if (!id) return;

    /* 3. запускаем спиннер он будет крутится пока не сработает функция снизу */
    recipeView.renderSpinner();

    /* 4. model это объект с логикой приложения. там хранится функция для скачивания речепта с сервера она асинхронаая поэтому ждем пока загрузится. Эта функция останавливает этот код пока не выполнится функция. а в ней мы ждем дынные с сервера. После того как они придут запустится следующая функция*/
    await model.loadRecipe(id);

    /* 5. Этот метод отрисовывает в диве разметку и передает ей данные рецепта */
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

/* 1. когда страница загрузилась или поменялся url. запускается функция controlRecipes */
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
