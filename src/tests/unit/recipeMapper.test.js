import * as recipeMapper from '../../utils/recipeMapper';

const rawDrink = {
  idDrink: 'mapped drink id',
  strDrink: 'mapped drink title',
  strTags: 'mapped drink tags',
  strArea: 'mapped drink nationality',
  strCategory: 'mapped drink categories',
  strAlcoholic: 'mapped drink alcoholic',
  strInstructions: 'mapped drink instructions',
  strDrinkThumb: 'mapped drink thumbnail url',
  strIngredient1: 'mapped drink ingredient',
  strMeasure1: 'mapped drink measure',
};
const rawMeal = {
  idMeal: 'mapped meal id',
  strMeal: 'mapped meal title',
  strTags: 'mapped meal tags',
  strArea: 'mapped meal nationality',
  strYoutube: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
  strCategory: 'mapped meal categories',
  strAlcoholic: 'mapped meal alcoholic',
  strInstructions: 'mapped meal instructions',
  strMealThumb: 'mapped meal thumbnail url',
  strIngredient1: 'mapped meal ingredient',
  strMeasure1: 'mapped meal measure',
};
const mappedDrink = {
  id: 'mapped drink id',
  title: 'mapped drink title',
  tags: 'mapped drink tags',
  type: 'drink',
  videoUrl: null,
  videoCode: null,
  categories: 'mapped drink categories',
  thumbnailUrl: 'mapped drink thumbnail url',
  instructions: 'mapped drink instructions',
  alcoholic: 'mapped drink alcoholic',
  nationality: 'mapped drink nationality',
  ingredients: [
    {
      ingredient: 'mapped drink ingredient',
      measure: 'mapped drink measure',
    },
  ],
};
const mappedMeal = {
  id: 'mapped meal id',
  title: 'mapped meal title',
  tags: 'mapped meal tags',
  type: 'meal',
  categories: 'mapped meal categories',
  thumbnailUrl: 'mapped meal thumbnail url',
  instructions: 'mapped meal instructions',
  videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
  videoCode: '9bZkp7q19f0',
  alcoholic: 'mapped meal alcoholic',
  nationality: 'mapped meal nationality',
  ingredients: [
    {
      ingredient: 'mapped meal ingredient',
      measure: 'mapped meal measure',
    },
  ],
};

describe('utils/recipeMapper.js - mapToRecipe()', () => {
  test('should return a mapped drink recipe', () => {
    const output = recipeMapper.mapToRecipe(rawDrink, 'drink');

    expect(output).toEqual(mappedDrink);
  });

  test('should return a mapped meal recipe', () => {
    const output = recipeMapper.mapToRecipe(rawMeal);

    expect(output).toEqual(mappedMeal);
  });
});

describe('utils/recipeMapper.js - mapToRecipes()', () => {
  test('should return an array of mapped drink recipes', () => {
    const output = recipeMapper.mapToRecipes([rawDrink, rawDrink], 'drink');

    expect(output).toEqual([mappedDrink, mappedDrink]);
  });

  test('should return an array of mapped meal recipes', () => {
    const output = recipeMapper.mapToRecipes([rawMeal, rawMeal]);

    expect(output).toEqual([mappedMeal, mappedMeal]);
  });
});
