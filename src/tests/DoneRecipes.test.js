import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import doneRecipesMock from './helpers/mocks/doneRecipesMock';

describe('testando Pagina doneRecipes', () => {
  test('Testa se as tags são renderizadas', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const tags = await screen.findAllByTestId('0-Pasta-horizontal-tag');
    await waitFor(() => expect(tags[0]).toBeInTheDocument(), { timeout: 3000 });
  });
});
