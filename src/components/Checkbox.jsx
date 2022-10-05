import PropTypes from 'prop-types';

function Checkbox({ ingredients, handleClick, isCheckd }) {
  return (
    <>
      {ingredients.map((ingredient, index) => (
        <li key={ index }>
          <label
            htmlFor={ `checkbox${index}` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `checkbox${index}` }
              value={ ingredient.ingredient || '' }
              onClick={ (e) => handleClick(e, index) }
              checked={ isCheckd.length === 0 ? true : isCheckd[index] }
              readOnly
            />
            <span>{`${ingredient.ingredient} - ${ingredient.measure}`}</span>
          </label>
        </li>
      ))}
    </>
  );
}

Checkbox.defaultProps = {
  isCheckd: [],
  ingredients: [],
};

Checkbox.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape()),
  isCheckd: PropTypes.arrayOf(PropTypes.bool),
  handleClick: PropTypes.func.isRequired,
};

export default Checkbox;
