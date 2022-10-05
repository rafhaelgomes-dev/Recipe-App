import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';
import Styles from '../styles/pages/Profile.module.css';
import Perfil from '../Assets/Perfil.svg';
import imgDoneRecipes from '../Assets/imgDoneRecipes.svg';
import IconeFavorite from '../Assets/IconFavorite.svg';
import IconeLogout from '../Assets/IconeLogout.svg';

function Profile() {
  const email = useLocalStorage('user');
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('drinksToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <Header />
      <div className={ Styles.containerPerfilAndEmail }>
        <img src={ Perfil } alt="Foto de perfil" />
        <p className={ Styles.TextProfile }>PROFILE</p>
        <p
          className={ Styles.textEmail }
          data-testid="profile-email"
        >
          {email}
        </p>
      </div>
      <section className={ Styles.containerButton }>
        <div>
          <button
            type="button"
            className={ Styles.buttonDoneRecipes }
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            <img src={ imgDoneRecipes } alt="imagem done recipes" />
            <p className={ Styles.textDoneRecipes }>Done Recipes</p>
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className={ Styles.buttonDoneFavorite }
            onClick={ () => history.push('/favorite-recipes') }
          >
            <img src={ IconeFavorite } alt="imagem done recipes" />
            <p className={ Styles.textDoneRecipes }>Favorite Recipes</p>
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            className={ Styles.buttonDoneFavorite }
            onClick={ handleLogout }
          >
            <img src={ IconeLogout } alt="imagem done recipes" />
            <p className={ Styles.textDoneRecipes }>Logout</p>
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
