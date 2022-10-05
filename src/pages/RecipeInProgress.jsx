import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation, useRouteMatch } from 'react-router-dom';
import LoadingCard from '../components/LoadingCard';
import { getDrinkById, getMealById } from '../services/recipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Footer from '../components/Footer';
import Checkbox from '../components/Checkbox';
import Styles from '../styles/pages/RecipeInProgress.module.css';
import recipeInProgress from '../services/recipeInprogress';
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
  const [finishedRecipe, setFinishedRecipe] = useState(true);
  const { pathname } = useLocation();
  const { params } = useRouteMatch();
  const history = useHistory();
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
      recipeInProgress(recipe, arrayBool, setIsChecked);
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
  }, [recipe]);

  useEffect(() => {
    if (isCheckd === undefined) {
      return;
    }
    const finish = isCheckd.every((e) => e === true);
    setFinishedRecipe(!finish);
  }, [isCheckd]);

  useEffect(() => {
    if (isDrink) getDrinkById(id).then(setRecipe);
    else if (isMeal) getMealById(id).then(setRecipe);
  }, [id, isDrink, isMeal]);

  const handleFinishedRecipe = () => {
    let getStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getStorage === null) {
      getStorage = [];
    }
    localStorage.setItem('doneRecipes', JSON.stringify([...getStorage, recipe]));
    history.push('/done-recipes');
  };

  if (!recipe) return <LoadingCard />;

  const { title, categories, thumbnailUrl, instructions, ingredients } = recipe;
  return (
    <div className={ Styles.RecipeInProgress }>
      <img
        src={ thumbnailUrl }
        alt="imagem receita"
        className={ Styles.imgRecipe }
        data-testid="recipe-photo"
      />
      <section className={ Styles.containerName }>
        <h1 data-testid="recipe-title">
          {title}

        </h1>
        <h3 data-testid="recipe-category">
          {categories}
        </h3>
      </section>
      <section className={ Styles.containerButtonsFavorite }>
        <button type="button" data-testid="share-btn" onClick={ handleClickShare }>
          <img src={ shareIcon } alt="Icone compartilhar" />
        </button>

        <button
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          type="button"
          data-testid="favorite-btn"
          onClick={ handleClickFavorites }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite button"
          />
        </button>
      </section>
      <section className={ Styles.containerIngredientes }>
        <p>Ingredientes</p>
        <ul>
          <Checkbox
            ingredients={ ingredients }
            handleClick={ handleClick }
            isCheckd={ isCheckd }
          />
        </ul>
      </section>
      <section className={ Styles.containerInstructions }>
        <h1>Instruções</h1>
        <p data-testid="instructions">
          {instructions}

        </p>
      </section>
      <section className={ Styles.containerButton }>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className={ finishedRecipe ? Styles.buttonFinishDisable : Styles.buttonFinish }
          disabled={ finishedRecipe }
          onClick={ handleFinishedRecipe }
        >
          Finalizar Receita
        </button>
      </section>
      { alert && <p>{alert}</p> }
      <Footer />
    </div>
  );
}

export default RecipeInProgress;
