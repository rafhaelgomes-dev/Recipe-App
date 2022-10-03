import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchApiDrinks, fetchApiMeals } from '../redux/actions/actionSearchApi';
import Styles from '../styles/components/Search.module.css';

function SearchBar({ dispatch }) {
  const location = useLocation();
  const [filter, setFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  function submitTheSearch() {
    if (location.pathname === '/meals') {
      dispatch(fetchApiMeals(filter, searchFilter));
    }
    if (location.pathname === '/drinks') {
      dispatch(fetchApiDrinks(filter, searchFilter));
    }
  }

  useEffect(() => {
    if (filter === 'search.php?f=' && searchFilter.length === 2) {
      return global.alert('Your search must have only 1 (one) character');
    }
  }, [filter, searchFilter]);

  return (
    <fieldset className={ Styles.containerSearch }>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          className={ Styles.inputSearch }
          type="text"
          value={ searchFilter }
          onChange={ (e) => setSearchFilter(e.target.value) }
        />
      </label>
      <div className={ Styles.containerInput }>
        <label
          htmlFor="ingredient-search-radio"
          className={ Styles.inputRadioButton }
        >
          <input
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            type="radio"
            name="search-radio"
            value={ filter }
            onClick={ () => setFilter('filter.php?i=') }
          />
          Ingrediente
        </label>
        <label
          htmlFor="name-search-radio"
          className={ Styles.inputRadioButton }
        >
          <input
            id="name-search-radio"
            data-testid="name-search-radio"
            type="radio"
            name="search-radio"
            value={ filter }
            onClick={ () => setFilter('search.php?s=') }
          />
          Nome
        </label>
        <label
          htmlFor="first-letter-search-radio"
          className={ Styles.inputRadioButton }
        >
          <input
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-radio"
            value={ filter }
            onClick={ () => setFilter('search.php?f=') }
          />
          Primeira Letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        className={ Styles.buttonBuscar }
        type="button"
        onClick={ submitTheSearch }
      >
        Buscar
      </button>
    </fieldset>
  );
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SearchBar);
