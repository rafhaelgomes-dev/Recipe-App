import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import LoadingCard from '../components/LoadingCard';
import { getDrinkById, getMealById } from '../services/recipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import {
  addFavoriteRecipe,
  getFavoriteRecipeById,
} from '../services/storage';

const copy = require('clipboard-copy');

const TIMER = 2000;

function RecipeInProgress() {
  const [recipe, setRecipe] = useState(null);
  const [isCheckd, setIsChecked] = useState(undefined);
  const [alert, setAlert] = useState('');
  /*   const [favoriteRecipes, setFavoriteRecipes] = useState(false); */

  const { pathname } = useLocation();
  const { params } = useRouteMatch();
  const { id } = params;

  const [isFavorite, setFavorite] = useState(() => !!getFavoriteRecipeById(id));
  const isMeal = /^\/meals\/.*/i.test(pathname);
  const isDrink = /^\/drinks\/.*/i.test(pathname);

  const controlCheckbox = () => {
    let arrayBool = [];
    if (!recipe) return;
    recipe.ingredients.forEach(() => {
      arrayBool = [...arrayBool, false];
    });
    if (isDrink) {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (!storage.bebidas[recipe.id]) {
        setIsChecked(arrayBool);
        return;
      }
      if (storage.bebidas[recipe.id].length === 0) {
        setIsChecked(arrayBool);
        return;
      }
      storage.bebidas[recipe.id].forEach((e) => {
        arrayBool[e] = !arrayBool[e];
      });
      setIsChecked(arrayBool);
    }
    if (isMeal) {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (!storage.comidas[recipe.id]) {
        setIsChecked(arrayBool);
        return;
      }
      if (storage.comidas[recipe.id].length === 0) {
        setIsChecked(arrayBool);
        return;
      }
      storage.comidas[recipe.id].forEach((e) => {
        arrayBool[e] = !arrayBool[e];
      });
      setIsChecked(arrayBool);
    }
  };

  const ingredientChecked = (index) => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isDrink) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...storage,
        bebidas: {
          ...storage.bebidas,
          [recipe.id]: storage.bebidas[recipe.id]
          === undefined ? [index]
            : [...storage.bebidas[recipe.id], index],
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...storage,
        comidas: {
          ...storage.comidas,
          [recipe.id]: storage.comidas[recipe.id]
          === undefined ? [index]
            : [...storage.comidas[recipe.id], index],
        },
      }));
    }
  };

  const ingredientNotChecked = (index) => {
    const storage2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isDrink) {
      const bebidas = storage2.bebidas[recipe.id];
      const filterBebidas = bebidas.filter((e2) => e2 !== index);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...storage,
        bebidas: {
          ...storage.bebidas,
          [recipe.id]: filterBebidas,
        },
      }));
    } else {
      const comidas = storage2.comidas[recipe.id];
      const filterComidas = comidas.filter((e2) => e2 !== index);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...storage,
        comidas: {
          ...storage.comidas,
          [recipe.id]: filterComidas,
        },
      }));
    }
  };

  const handleClick = (e, index) => {
    const { checked } = e.target;
    if (checked) {
      ingredientChecked(index);
    } else {
      ingredientNotChecked(index);
    }
    controlCheckbox();
  };

  const handleClickShare = () => {
    copy(`${window.location.origin}/${isDrink ? 'drinks' : 'meals'}/${id}`);
    setAlert('Link copied!');
    setTimeout(() => {
      setAlert('');
    }, TIMER);
  };

  const handleClickFavorites = () => {
    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verifyId = storageFavoriteRecipes.some((e) => e.id === recipe.id);
    if (verifyId) {
      const filterRemoveId = storageFavoriteRecipes.filter((e) => e.id !== recipe.id);
      setFavorite((current) => !current);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterRemoveId));
    } else {
      addFavoriteRecipe(recipe);
      setFavorite((current) => !current);
    }
  };

  useEffect(() => {
    const storageProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        bebidas: [],
        comidas: [],
      }));
      controlCheckbox();
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      controlCheckbox();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  useEffect(() => {
    if (isDrink) getDrinkById(id).then(setRecipe);
    else if (isMeal) getMealById(id).then(setRecipe);
  }, [id, isDrink, isMeal]);

  if (!recipe) return <LoadingCard />;

  const { title, categories, thumbnailUrl, instructions, ingredients } = recipe;
  return (
    <div>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>

      <img src={ thumbnailUrl } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">
        {title}

      </h1>
      <h3 data-testid="recipe-category">
        {categories}

      </h3>
      <button type="button" data-testid="share-btn" onClick={ handleClickShare }>
        Compartilhar

      </button>

      <button
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClickFavorites }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="favorite button" />

      </button>

      <p data-testid="instructions">
        {instructions}

      </p>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita

      </button>

      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index }>
            <label
              htmlFor={ `checkbox${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ `checkbox${index}` }
                value={ ingredient.ingredient }
                onClick={ (e) => handleClick(e, index) }
                checked={ isCheckd === undefined ? true : isCheckd[index] }
                readOnly
              />
              <span>{`${ingredient.ingredient} - ${ingredient.measure}`}</span>
            </label>
          </li>
        ))}
      </ul>
      { alert && <p>{alert}</p> }
    </div>
  );
}

export default RecipeInProgress;
