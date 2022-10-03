import '../helpers/mocks/localStorageUtils';
import * as localStorageUtils from '../../utils/localStorageUtils';
import * as storage from '../../services/storage';

const IN_PROGRESS_KEY = 'inProgressRecipes';
const FAVORITE_RECIPES_KEY = 'favoriteRecipes';
const inputRecipe = {
  id: 'test-id',
  type: 'test-type',
  nationality: 'test-nationality',
  categories: 'test-categories',
  alcoholic: 'test-alcoholic',
  name: 'test-name',
  thumbnailUrl: 'test-image',
};
const outputRecipe = {
  id: inputRecipe.id,
  type: inputRecipe.type,
  nationality: inputRecipe.nationality,
  category: inputRecipe.categories,
  alcoholicOrNot: inputRecipe.alcoholic,
  name: inputRecipe.title,
  image: inputRecipe.thumbnailUrl,
};

describe('services/storage.js - addInProgressRecipe()', () => {
  test('should calls readStorage with in progress key', () => {
    localStorageUtils.readStorage.mockReturnValue([]);

    storage.addInProgressRecipe();

    expect(localStorageUtils.readStorage).toBeCalledTimes(1);
    expect(localStorageUtils.readStorage).toBeCalledWith(IN_PROGRESS_KEY, []);
  });

  test('should calls writeStorage with in progress key', () => {
    localStorageUtils.readStorage.mockReturnValue([]);

    storage.addInProgressRecipe();

    expect(localStorageUtils.writeStorage).toBeCalledTimes(1);
    expect(localStorageUtils.writeStorage).toBeCalledWith(
      IN_PROGRESS_KEY,
      expect.any(Array),
    );
  });

  test('should calls writeStorage with an array with received recipe and previous recipes', () => {
    const previousData = ['previous'];
    const recipe = 'new-recipe';

    localStorageUtils.readStorage.mockReturnValue(previousData);

    storage.addInProgressRecipe(recipe);

    expect(localStorageUtils.writeStorage).toBeCalledTimes(1);
    expect(localStorageUtils.writeStorage).toBeCalledWith(IN_PROGRESS_KEY, [
      ...previousData,
      recipe,
    ]);
  });
});

describe('services/storage.js - addFavoriteRecipe()', () => {
  test('should calls readStorage with favorite recipes key', () => {
    localStorageUtils.readStorage.mockReturnValue([]);

    storage.addFavoriteRecipe(inputRecipe);

    expect(localStorageUtils.readStorage).toBeCalledTimes(1);
    expect(localStorageUtils.readStorage).toBeCalledWith(FAVORITE_RECIPES_KEY, []);
  });

  test('should calls writeStorage with favorite recipes key', () => {
    localStorageUtils.readStorage.mockReturnValue([]);

    storage.addFavoriteRecipe(inputRecipe);

    expect(localStorageUtils.writeStorage).toBeCalledTimes(1);
    expect(localStorageUtils.writeStorage).toBeCalledWith(FAVORITE_RECIPES_KEY, [
      outputRecipe,
    ]);
  });

  test('should calls writeStorage with an array with received recipe and previous recipes', () => {
    const previousData = [outputRecipe];
    localStorageUtils.readStorage.mockReturnValue(previousData);

    const customInput = { ...inputRecipe, nationality: undefined, alcoholic: undefined };
    const customOutput = { ...outputRecipe, nationality: '', alcoholicOrNot: '' };

    storage.addFavoriteRecipe(customInput);

    expect(localStorageUtils.writeStorage).toBeCalledTimes(1);
    expect(localStorageUtils.writeStorage).toBeCalledWith(FAVORITE_RECIPES_KEY, [
      ...previousData,
      customOutput,
    ]);
  });
});

describe('services/storage.js - getInProgressRecipeById()', () => {
  beforeEach(() => {
    localStorageUtils.readStorage.mockReturnValue({
      meals: {
        [outputRecipe.id]: 'in progress',
      },
      drinks: {},
    });
  });

  test('should calls readStorage with in progress key', () => {
    storage.getInProgressRecipeById('test-id');

    expect(localStorageUtils.readStorage).toBeCalledTimes(1);
    expect(localStorageUtils.readStorage).toBeCalledWith(IN_PROGRESS_KEY, {});
  });

  test('should returns readStorage data', () => {
    const output = storage.getInProgressRecipeById('test-id');

    expect(output).toBe('in progress');
  });

  test('should returns undefined when readStorage data is not defined', () => {
    const output = storage.getInProgressRecipeById('not found');

    expect(output).toBeUndefined();
  });
});

describe('services/storage.js - getFavoriteRecipeById()', () => {
  beforeEach(() => {
    localStorageUtils.readStorage.mockReturnValue([outputRecipe]);
  });

  test('should calls readStorage with favorite recipes key', () => {
    storage.getFavoriteRecipeById('test-id');

    expect(localStorageUtils.readStorage).toBeCalledTimes(1);
    expect(localStorageUtils.readStorage).toBeCalledWith(FAVORITE_RECIPES_KEY, []);
  });

  test('should returns readStorage data', () => {
    const output = storage.getFavoriteRecipeById('test-id');

    expect(output).toBe(outputRecipe);
  });

  test('should returns undefined when readStorage data is not defined', () => {
    const output = storage.getFavoriteRecipeById('not found');

    expect(output).toBeUndefined();
  });
});
