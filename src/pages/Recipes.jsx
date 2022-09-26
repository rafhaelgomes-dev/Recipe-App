import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../components/Card';
import { fetchApiDrinks, fetchApiMeals } from '../redux/actions/actionRecipeApi';
import LoadingCard from '../components/LoadingCard';
import CategoryButtons from '../components/CategoryButtons';
import Footer from '../components/Footer';

function Recipes({ match, dispatch, Loading }) {
  useEffect(() => {
    const { path } = match;
    if (path === '/drinks') {
      dispatch(fetchApiDrinks());
    } else {
      dispatch(fetchApiMeals());
    }
  }, [dispatch, match]);

  return Loading ? <LoadingCard /> : (
    <>
      <CategoryButtons />
      <Card />
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  Loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  Loading: state.RecipesAPI.LoadingAPI,
});

export default connect(mapStateToProps, null)(Recipes);