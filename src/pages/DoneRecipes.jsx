import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  const TITLE_PAGE = 'Done Recipes';
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const recipesGetStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesGetStorage === null) {
      return;
    }
    setRecipes(recipesGetStorage);
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

  return (
    <div>
      <Header title={ TITLE_PAGE } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleMeals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleDrinks }
      >
        Drinks
      </button>
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
