import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import Styles from '../styles/pages/DoneRecipes.module.css';
import Footer from '../components/Footer';
import AllFavorite from '../Assets/AllFavorite.svg';
import foods from '../Assets/foods.svg';
import drinks from '../Assets/drinks.svg';

let messageClearTimeoutId;
const ONE_SECOND = 1_000;

function DoneRecipes() {
  const TITLE_PAGE = 'Done Recipes';
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const recipesGetStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesGetStorage === null) {
      return;
    }

    setRecipes(recipesGetStorage);

    return () => {
      clearTimeout(messageClearTimeoutId);
    };
  }, []);

  const handleMeals = () => {
    const recipesGetStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipesFilterMeals = recipesGetStorage.filter((e) => e.type === 'meal');
    setRecipes(recipesFilterMeals);
  };

  const handleDrinks = () => {
    const recipesGetStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipesFilterMeals = recipesGetStorage.filter((e) => e.type === 'drink');
    setRecipes(recipesFilterMeals);
  };

  const handleAll = () => {
    const recipesGetStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(recipesGetStorage);
  };

  function handleShareRecipe(type, id) {
    if (type === 'meal') {
      copy(`${window.location.origin}/meals/${id}`);
      setMessage('Link copied!');
    } else {
      copy(`${window.location.origin}/drinks/${id}`);
      setMessage('Link copied!');
    }

    if (messageClearTimeoutId) clearTimeout(messageClearTimeoutId);

    messageClearTimeoutId = setTimeout(() => {
      setMessage(' ');
    }, ONE_SECOND);
  }

  return (
    <div className={ Styles.containerDoneRecipes }>
      {message && <span>{message}</span>}
      <Header title={ TITLE_PAGE } />
      <section className={ Styles.containerButtons }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className={ Styles.buttonCategory }
          onClick={ handleAll }
        >
          <img src={ AllFavorite } alt="Icone" />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className={ Styles.buttonCategory }
          onClick={ handleMeals }
        >
          <img src={ foods } alt="Icone" />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className={ Styles.buttonCategory }
          onClick={ handleDrinks }
        >
          <img src={ drinks } alt="Icone" />
        </button>
      </section>
      <section className={ Styles.containerCard }>
        {recipes.map((e, i) => (
          <div key={ i } className={ Styles.cardDoneRecipes }>
            <Link
              to={ `/${e.type === 'drink' ? 'drinks'
                : 'meals'}/${e.id}` }
              className={ Styles.link }
            >
              <img
                src={ e.thumbnailUrl }
                className={ Styles.imgDoneRecipes }
                alt="imagem da receita"
                data-testid={ `${i}-horizontal-image` }
              />
              <p data-testid={ `${i}-horizontal-name` }>{e.title}</p>
            </Link>
            <p
              data-testid={ `${i}-horizontal-top-text` }
            >
              { e.type === 'meal'
                ? `${e.nationality} - ${e.categories}`
                : `${e.alcoholic} - ${e.categories}` }
            </p>
            <p data-testid={ `${i}-horizontal-done-date` }>{e.doneDate}</p>
            <p>{e.tags}</p>
            <button
              src={ shareIcon }
              className={ Styles.buttonShare }
              type="button"
              data-testid={ `${i}-horizontal-share-btn` }
              onClick={ () => handleShareRecipe(e.type, e.id) }
            >
              <img src={ shareIcon } alt="Icone compartilhar" />
            </button>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
