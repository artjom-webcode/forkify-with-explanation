// Это глобальное хранилище состояния приложения.
// Здесь будут сохраняться все данные, к которым нужен доступ из разных модулей.
export const state = {
  recipe: {}, // Здесь будет храниться один активный рецепт (тот, что открыт)
};

// Асинхронная функция для загрузки рецепта с сервера по ID.
// Она не возвращает результат напрямую, а сохраняет его в state.recipe.
export const loadRecipe = async function (id) {
  try {
    // 1. Отправляем GET-запрос к API по заданному ID рецепта
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    // 2. Преобразуем ответ в JSON
    const data = await res.json();

    // 3. Если произошла ошибка (например, 404), выбрасываем исключение
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // 4. Извлекаем нужные данные рецепта из вложенного объекта data.data.recipe
    const { recipe } = data.data;

    // 5. Сохраняем отформатированный рецепт в глобальное состояние
    // Переименовываем свойства API в более читаемые и удобные имена
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
    // Временно выводим ошибку в консоль (в будущем можно будет показывать пользователю)
    console.error(`${err} 💥💥💥💥`);
  }
};

/* Общее понимание:
Этот код реализует "Model" в архитектуре MVC.

Он отвечает только за работу с данными: загрузку, хранение, преобразование.

Функция loadRecipe(id):

делает запрос к API,

получает и обрабатывает данные рецепта,

сохраняет их в state.recipe,

и больше ничего — не рендерит, не возвращает результат (этим занимается контроллер и view).

Если нужно — могу добавить обработку ошибок, loading-флаг или сделать функцию универсальной для других запросов. */
