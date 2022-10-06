import copy from 'clipboard-copy';
import React, { useEffect, useState, useMemo } from 'react';
import { FiHome, FiShare } from 'react-icons/fi';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../styles/pages/RecipeDetails.module.css';
import filledHeartIcon from '../images/blackHeartIcon.svg';
import outlineHeartIcon from '../images/whiteHeartIcon.svg';
import LoadingCard from '../components/LoadingCard';
import Recommendations from '../components/Recommendations';
import RecipeVideo from '../components/RecipeVideo';
import RecipeIngredients from '../components/RecipeIngredients';
import { getDrinkById, getDrinks, getMealById, getMeals } from '../services/recipes';
import {
  addFavoriteRecipe,
  getFavoriteRecipeById,
  getInProgressRecipeById,
} from '../services/storage';

const RECOMMENDATIONS_LENGTH = 6;
const ONE_SECOND = 1_000;
let messageClearTimeoutId;

function RecipeDetails() {
  const { pathname } = useLocation();
  const { params } = useRouteMatch();
  const { id } = params;
  const history = useHistory();

  const [recipe, setRecipe] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');
  const [isFavorite, setFavorite] = useState(() => !!getFavoriteRecipeById(id));

  const isMeal = /^\/meals\/.*/i.test(pathname);
  const isDrink = /^\/drinks\/.*/i.test(pathname);

  const isInProgress = useMemo(() => !!getInProgressRecipeById(id), [id]);

  useEffect(() => {
    function sliceArray(array, length = RECOMMENDATIONS_LENGTH) {
      return array.slice(0, length);
    }

    if (isDrink) {
      getDrinkById(id).then(setRecipe);
      getMeals().then((recipes) => setRecommendations(sliceArray(recipes)));
    }

    if (isMeal) {
      getMealById(id).then(setRecipe);
      getDrinks().then((recipes) => setRecommendations(sliceArray(recipes)));
    }
  }, [id, isDrink, isMeal]);

  useEffect(
    () => () => {
      clearTimeout(messageClearTimeoutId);
    },
    [],
  );

  function handleShareRecipe() {
    copy(window.location.href);
    setMessage('Link copied!');

    if (messageClearTimeoutId) clearTimeout(messageClearTimeoutId);

    messageClearTimeoutId = setTimeout(() => {
      setMessage('');
    }, ONE_SECOND);
  }

  function handleFavoriteRecipe() {
    let storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageFavoriteRecipes === null) {
      storageFavoriteRecipes = [];
    }
    const verifyId = storageFavoriteRecipes.some((e) => e.id === recipe.id);
    if (verifyId) {
      const filterRemoveId = storageFavoriteRecipes.filter((e) => e.id !== recipe.id);
      setFavorite((current) => !current);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterRemoveId));
    } else {
      addFavoriteRecipe(recipe);
      setFavorite((current) => !current);
    }
  }

  if (!recipe) return <LoadingCard />;

  return (
    <div className={ styles.containerRecipeDetails }>
      {message && <span>{message}</span>}
      <div className={ styles.containerImg }>
        <img
          src={ recipe.thumbnailUrl }
          alt={ recipe.title }
          data-testid="recipe-photo"
          className={ styles.imgRecipe }
        />
      </div>
      <div className={ styles.containerButtons }>
        <Link to="/">
          <FiHome />
        </Link>

        <button
          type="button"
          onClick={ handleShareRecipe }
          className={ styles.buttonShare }
          data-testid="share-btn"
        >
          <FiShare />
        </button>
        <button
          type="button"
          onClick={ handleFavoriteRecipe }
          className={ styles.buttonFavorite }
        >
          <img
            src={ isFavorite ? filledHeartIcon : outlineHeartIcon }
            alt=""
            data-testid="favorite-btn"
          />
        </button>
      </div>

      <h1 className={ styles.h1 } data-testid="recipe-title">{recipe.title}</h1>
      <div className={ styles.containerIngredientes }>
        <h2>Ingredientes</h2>
        <p data-testid="recipe-category">
          {recipe.categories}
          {isDrink && (
            <>
              {' - '}
              {recipe.alcoholic}
            </>
          )}
        </p>
        <RecipeIngredients ingredients={ recipe.ingredients } />
      </div>
      <div className={ styles.containerIntroctions }>
        <h2>Instruções</h2>
        <p data-testid="instructions">{recipe.instructions}</p>
        {recipe.videoUrl && <RecipeVideo videoCode={ recipe.videoCode } />}
      </div>
      <div className={ styles.ContainerRecomendados }>
        <Recommendations recommendations={ recommendations } />
      </div>
      <button
        onClick={ () => history.push(`${pathname}/in-progress`) }
        type="button"
        className={ styles.startRecipeButton }
        data-testid="start-recipe-btn"
      >
        {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default RecipeDetails;
