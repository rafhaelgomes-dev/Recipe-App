const mealMock = {
  id: 'test-meal',
  title: 'Title',
  tags: 'Tags',
  type: 'Type',
  categories: 'Categories',
  thumbnailUrl: 'Thumbnailurl',
  instructions: 'Instructions',
  nationality: 'Nationality',
  videoUrl: 'test',
  videoCode: 'test',
  ingredients: [
    {
      ingredient: 'Ingredient 1',
      measure: 'Measure 1',
    },
    {
      ingredient: 'Ingredient 2',
      measure: 'Measure 2',
    },
  ],
};

const drinkMock = {
  id: 'test-drink',
  title: 'Title',
  tags: 'Tags',
  type: 'drink',
  categories: 'Categories',
  thumbnailUrl: 'Thumbnailurl',
  instructions: 'Instructions',
  nationality: 'Nationality',
  ingredients: [
    {
      ingredient: 'Ingredient 1',
      measure: 'Measure 1',
    },
    {
      ingredient: 'Ingredient 2',
      measure: 'Measure 2',
    },
  ],
};

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

export { doneRecipes, drinkMock, mealMock };
