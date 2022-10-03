import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

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

  function handleShareRecipe(type, id) {
    copy(`${window.location.origin}/${type}/${id}`);
    setMessage('Link copied!');

    if (messageClearTimeoutId) clearTimeout(messageClearTimeoutId);

    messageClearTimeoutId = setTimeout(() => {
      setMessage('');
    }, ONE_SECOND);
  }

  return (
    <div>
      {message && <span>{message}</span>}
      <Header title={ TITLE_PAGE } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {recipes.map((e, i) => (
        <div key={ i }>
          <img
            src={ e.image }
            alt="imagem da receita"
            data-testid={ `${i}-horizontal-image` }
          />
          <p
            data-testid={ `${i}-horizontal-top-text` }
          >
            { e.type === 'meal'
              ? `${e.nationality} - ${e.category}`
              : `${e.alcoholicOrNot} - ${e.category}` }
          </p>
          <p data-testid={ `${i}-horizontal-name` }>{e.name}</p>
          <p data-testid={ `${i}-horizontal-done-date` }>{e.doneDate}</p>
          <button
            src={ shareIcon }
            type="button"
            data-testid={ `${i}-horizontal-share-btn` }
            onClick={ () => handleShareRecipe(e.type, e.id) }
          >
            <img src={ shareIcon } alt="Icone compartilhar" />
          </button>
          {e.tags.map((e1) => (
            <p key={ e1 } data-testid={ `${i}-${e1}-horizontal-tag` }>{e1}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
