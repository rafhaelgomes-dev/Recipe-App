import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Styles from '../styles/components/Header.module.css';
import iconePesquiar from '../Assets/iconePesquiar.svg';
import iconePerfil from '../Assets/iconePerfil.svg';
// commit

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [showSearchBar, setSearchBar] = useState(false);

  function goToProfile() {
    history.push('/profile');
  }

  function showTheSearchBar() {
    if (showSearchBar) {
      return setSearchBar(false);
    }
    return setSearchBar(true);
  }

  const path = location.pathname;
  let showTitle = '';

  if (path === '/drinks') {
    showTitle = 'Drinks';
  }
  if (path === '/meals') {
    showTitle = 'Meals';
  }

  if (
    path === '/favorite-recipes'
    || path === '/done-recipes'
    || path === '/profile'
  ) {
    if (path === '/favorite-recipes') {
      showTitle = 'Favorite Recipes';
    }
    if (path === '/done-recipes') {
      showTitle = 'Done Recipes';
    }
    if (path === '/profile') {
      showTitle = 'Profile';
    }
    return (
      <header>
        <h1 data-testid="page-title">{ showTitle }</h1>
        <button
          data-testid="profile-top-btn"
          type="button"
          src={ ProfileIcon }
          onClick={ goToProfile }
        >
          <img src={ ProfileIcon } alt="Profile Icon" />
          Perfil
        </button>
      </header>
    );
  }

  return (
    <div className={ Styles.header }>
      <header className={ Styles.containerHeader }>
        <h1 data-testid="page-title">{ showTitle}</h1>
        <section className={ Styles.buttonContainerHeader }>
          <button
            data-testid="profile-top-btn"
            className={ Styles.buttonHeaderPerfil }
            type="button"
            src={ ProfileIcon }
            onClick={ goToProfile }
          >
            <img src={ iconePerfil } alt="Profile Icon" />
          </button>
          <button
            data-testid="search-top-btn"
            className={ Styles.buttonHeaderPesquisa }
            type="button"
            src={ SearchIcon }
            onClick={ showTheSearchBar }
          >
            <img src={ iconePesquiar } alt="Search Icon" />
          </button>
        </section>
      </header>
      <div className={ Styles.containerPesquisa }>
        { showSearchBar && (
          <SearchBar className={ Styles.containerSearch } />
        ) }
      </div>
    </div>
  );
}

export default Header;
