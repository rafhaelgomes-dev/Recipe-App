import PropTypes from 'prop-types';
import styles from '../styles/pages/RecipeDetails.module.css';

import { RecipeType } from '../utils/commonPropTypes';

function Recommendations({ recommendations }) {
  return (
    <>
      {recommendations.map((recommendation, index) => (
        <div
          className={ styles.divCardRecomendado }
          key={ recommendation.id }
          data-testid={ `${index}-recommendation-card` }
        >
          <img src={ recommendation.thumbnailUrl } alt={ recommendation.title } />
          <span data-testid={ `${index}-recommendation-title` }>
            {recommendation.title}
          </span>
        </div>
      ))}
    </>
  );
}

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(RecipeType).isRequired,
};

export default Recommendations;
