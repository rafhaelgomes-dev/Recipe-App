import { readStorage, writeStorage } from '../utils/localStorageUtils';

const IN_PROGRESS_KEY = 'inProgressRecipes';
const FAVORITE_RECIPES_KEY = 'favoriteRecipes';

function addInProgressRecipe(recipe) {
  const alreadyInProgress = readStorage(IN_PROGRESS_KEY, []);

  writeStorage(IN_PROGRESS_KEY, [...alreadyInProgress, recipe]);
}

function addFavoriteRecipe(recipe) {
  const currentFavorites = readStorage(FAVORITE_RECIPES_KEY, []);

  const newFavoriteRecipe = {
    id: recipe.id,
    type: recipe.type,
    nationality: recipe.nationality || '',
    category: recipe.categories,
    alcoholicOrNot: recipe.alcoholic || '',
    name: recipe.title,
    image: recipe.thumbnailUrl,
  };

  writeStorage(FAVORITE_RECIPES_KEY, [...currentFavorites, newFavoriteRecipe]);
}

function getInProgressRecipeById(id) {
  const inProgressRecipes = readStorage(IN_PROGRESS_KEY, {});
  return inProgressRecipes.meals?.[id] || inProgressRecipes.drinks?.[id];
}

function getFavoriteRecipeById(id) {
  return readStorage(FAVORITE_RECIPES_KEY, []).find((recipe) => recipe.id === id);
}

export {
  addFavoriteRecipe,
  addInProgressRecipe,
  getFavoriteRecipeById,
  getInProgressRecipeById,
};
