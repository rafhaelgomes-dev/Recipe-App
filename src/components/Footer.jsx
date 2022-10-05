import React from 'react';
import { Link } from 'react-router-dom';

import style from '../styles/components/Footer.module.css';
import iconeBebida from '../Assets/iconeBebida.svg';
import iconePrato from '../Assets/iconePrato.svg';

function Footer() {
  return (
    <footer className={ style.Content_footer } data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ iconeBebida }
          alt="Icone de Bebidas"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ iconePrato }
          alt="Icone de Comidas"
        />
      </Link>
    </footer>
  );
}

export default Footer;
