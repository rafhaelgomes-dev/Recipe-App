import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Styles from '../styles/pages/FavoriteRecipes.module.css';
import AllFavorite from '../Assets/AllFavorite.svg';
import foods from '../Assets/foods.svg';
import drinks from '../Assets/drinks.svg';
import Footer from '../components/Footer';

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
    <div className={ Styles.ContainerFavoriteRecipes }>
      <Header />
      <div className={ Styles.ContainerButtonsFilter }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className={ Styles.buttonsFilter }
          name="all"
          value="all"
          onClick={ (e) => setValueInput(e.target.value) }
        >
          <img src={ AllFavorite } alt="Icone" />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className={ Styles.buttonsFilter }
          name="meal"
          value="meal"
          onClick={ (e) => setValueInput(e.target.value) }
        >
          <img src={ foods } alt="Icone" />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className={ Styles.buttonsFilter2 }
          name="drink"
          value="drink"
          onClick={ (e) => setValueInput(e.target.value) }
        >
          <img src={ drinks } alt="Icone" />
        </button>
      </div>
      {message && (
        <p>{message}</p>
      )}
      {(filteredRecipe.length === 0 ? favRecipes : filteredRecipe)
        ?.map((recipe, index) => (
          <div key={ index } className={ Styles.containerCard }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              className={ Styles.img }
            />
            <Link to={ `/${recipe.type}s/${recipe.id}` } className={ Styles.link }>
              <p
                data-testid={ `${index}-horizontal-name` }
                id={ recipe.id }
              >
                {recipe.name}
              </p>
            </Link>
            <div className={ Styles.shareFavoriteButton }>
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
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
