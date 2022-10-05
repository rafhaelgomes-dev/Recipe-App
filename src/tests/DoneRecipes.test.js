import React from 'react';
import copy from 'clipboard-copy';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import { doneRecipes as doneRecipesMock } from './helpers/mockData';

jest.mock('clipboard-copy', () => jest.fn());

const rotaDoneRecipes = '/done-recipes';

describe('testando Pagina doneRecipes', () => {
  test('Testa se as tags são renderizadas', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(rotaDoneRecipes);
    });
    const tags = await screen.findAllByTestId('0-Pasta-horizontal-tag');
    await waitFor(() => expect(tags[0]).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Testa botão meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(rotaDoneRecipes);
    });
    const buttonMeals = await screen.findByTestId('filter-by-meal-btn');
    userEvent.click(buttonMeals);
    await waitFor(() => expect(buttonMeals).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Testa botão drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(rotaDoneRecipes);
    });
    const buttonDrinks = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(buttonDrinks);
    await waitFor(() => expect(buttonDrinks).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Testa botão all', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(rotaDoneRecipes);
    });
    const buttonAll = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(buttonAll);
    await waitFor(() => expect(buttonAll).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Testa botão Copiar', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(rotaDoneRecipes);
    });
    const buttonCopy = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(buttonCopy);
    expect(copy).toBeCalledTimes(1);
    await waitFor(() => expect(buttonCopy).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Testa botão Copiar Drinks', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(rotaDoneRecipes);
    });
    const buttonCopy = await screen.findByTestId('1-horizontal-share-btn');
    userEvent.click(buttonCopy);
    expect(copy).toBeCalledTimes(1);
    await waitFor(() => expect(buttonCopy).toBeInTheDocument(), { timeout: 3000 });
  });
});
