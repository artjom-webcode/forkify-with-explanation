# forkify-with-explanation

# ✅ Подгрузка и отрисовка рецепта — шаг за шагом

---

## 🔄 Общая схема (MVC):

1. **Controller** — управляет процессом.
2. **Model** — загружает данные с сервера.
3. **View** — отрисовывает результат в DOM.

---

### 1. **Пользователь меняет URL (хеш):**

```js
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, controlRecipes));
```

- Когда пользователь переходит по ссылке или обновляет страницу, вызывается функция `controlRecipes`.

---

### 2. **Контроллер запускает загрузку рецепта:**

```js
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // получаем ID из URL
    if (!id) return;

    recipeView.renderSpinner(); // показываем спиннер

    await model.loadRecipe(id); // ⬅️ Ждём загрузку данных с сервера

    recipeView.render(model.state.recipe); // ⬅️ Отрисовываем рецепт
  } catch (err) {
    console.error(err);
  }
};
```

---

### 3. **Model загружает данные с API:**

```js
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`); // fetch + timeout

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
```

- Используется функция `getJSON`, которая делает `fetch` + `timeout`.
- Данные сохраняются в `state.recipe`, чтобы они были доступны по всему приложению.

---

### 4. **View отрисовывает рецепт:**

```js
recipeView.render(model.state.recipe);
```

- Метод `render()` вызывает `this._generateMarkup()` — создаёт HTML-разметку по данным.
- Эта разметка вставляется в DOM (в `div.recipe`).

Пример части разметки:

```js
_generateMarkup() {
  return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${this._data.title}" />
      <h1>${this._data.title}</h1>
    </figure>
    ...
  `;
}
```

---

### 5. **Промежуточная логика — helpers.js:**

```js
export const getJSON = async function (url) {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};
```

- Этот helper делает надёжную загрузку данных: либо получаем данные, либо выдаём ошибку через `timeout`.

---

## 📌 Визуальная схема:

```
Пользователь → Меняет URL (#id)
        ↓
Controller → controlRecipes()
        ↓
Model → loadRecipe(id) → fetch данные → state.recipe
        ↓
View → recipeView.render(state.recipe) → отображение на странице
```

---

## 🧠 Важно понять:

| Часть           | Отвечает за                                    |
| --------------- | ---------------------------------------------- |
| `controller.js` | управляет процессом загрузки и отображения     |
| `model.js`      | загружает данные с API, хранит их в `state`    |
| `recipeView.js` | отрисовывает HTML-разметку по данным рецепта   |
| `helpers.js`    | безопасно загружает JSON с сервера с таймаутом |

---

Если хочешь, могу нарисовать тебе **диаграмму** или составить мини-обзор по каждому файлу.
