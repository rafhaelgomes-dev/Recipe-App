import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [valueInput, setValueInput] = useState('');
  const [favRecipes, setFavRecipes] = useState([]);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [message, setMessage] = useState('');

  const copyLinkToShare = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    const msg = 'Link copied!';
    setMessage(msg);
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(storage);
  }, []);

  const filterComparator = (value) => {
    switch (value) {
    case 'drink':
      return favRecipes.filter((recipe) => recipe.type === value);

    case 'meal':
      return favRecipes.filter((recipe) => recipe.type === value);

    default:
      return favRecipes;
    }
  };

  const removeFavorites = (event) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterStorage = storage.filter((store) => store.id !== event);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterStorage));
    if (filterStorage.length !== 0) {
      setFilteredRecipe(filterStorage);
    } else {
      setFilteredRecipe(filterStorage);
      setFavRecipes(filterStorage);
    }
  };

  useEffect(() => {
    const filter = filterComparator(valueInput);
    setFilteredRecipe(filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueInput]);

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="all"
        value="all"
        onClick={ (e) => setValueInput(e.target.value) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="meal"
        value="meal"
        onClick={ (e) => setValueInput(e.target.value) }
      >
        Meal
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        value="drink"
        onClick={ (e) => setValueInput(e.target.value) }
      >
        Drinks
      </button>
      {message && (
        <p>{message}</p>
      )}
      {(filteredRecipe.length === 0 ? favRecipes : filteredRecipe)
        ?.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: 150, height: 150 } }
              />
              <p
                data-testid={ `${index}-horizontal-name` }
                id={ recipe.id }
              >
                {recipe.name}
              </p>
            </Link>
            {recipe.alcoholicOrNot && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
                {' '}
                -
                {' '}
                {recipe.category}
              </p>
            )}
            {recipe.area && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.area}
                {' '}
                -
                {' '}
                {recipe.category}
              </p>
            )}
            {recipe.nationality && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality}
                {' '}
                -
                {' '}
                {recipe.category}
              </p>
            )}
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              onClick={ () => { removeFavorites(recipe.id); } }
            >
              <img
                src={ blackHeartIcon }
                alt="Icone de Favorito"
              />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => { copyLinkToShare(recipe.id, recipe.type); } }
              src={ shareIcon }
            >
              <img
                src={ shareIcon }
                alt="Icone para Compartilhar link"
              />
            </button>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
