import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import mockFetch from '../../cypress/mocks/meals';
import mockFetch2 from '../../cypress/mocks/drinks';

const searchTopBtnID = 'search-top-btn';
const searchInputID = 'search-input';
const searchExecBtn = 'exec-search-btn';

const dataTestIdBtns = ['ingredient-search-radio', 'name-search-radio', 'first-letter-search-radio'];
const filters = ['filter.php?i=', 'search.php?s=', 'search.php?f='];

describe('Testando o componente SearchBar', () => {
  afterEach(() => { global.fetch.mockClear(); });
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFetch),
    });
  });

  test('Verifica se o estado filter quando o btn quando clicado  recebe o valor correto ', async () => {
    renderWithRouter(<App />, {}, '/meals');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    const searchBtn = screen.getByTestId(searchTopBtnID);
    userEvent.click(searchBtn);
    dataTestIdBtns.forEach((dataTestId, index) => {
      const radioBtn = screen.getByTestId(dataTestId);
      userEvent.click(radioBtn);
      expect(radioBtn.value).toEqual(filters[index]);
    });
  });
  test('Verifica se é possível buscar um ingrediente chicken', async () => {
    renderWithRouter(<App />, {}, '/meals');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(searchTopBtnID));
    userEvent.click(screen.getByTestId(dataTestIdBtns[0]));
    userEvent.type(screen.getByTestId(searchInputID), 'chicken');
    expect(screen.getByTestId(searchInputID)).toHaveValue('chicken');
    userEvent.click(screen.getByTestId(searchExecBtn));
  });
  test('Verifica se é possível buscar um ingrediente vodka', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFetch2),
    });
    renderWithRouter(<App />, {}, '/drinks');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(searchTopBtnID));
    userEvent.click(screen.getByTestId(dataTestIdBtns[0]));
    userEvent.type(screen.getByTestId(searchInputID), 'vodka');
    expect(screen.getByTestId(searchInputID)).toHaveValue('vodka');
    userEvent.click(screen.getByTestId(searchExecBtn));
  });
  test('Verifica se é disparado um alert quando o filtro para buscar por letra é ativado e mais de um caractere é inserido', async () => {
    global.alert = jest.fn();
    renderWithRouter(<App />, {}, '/meals');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(searchTopBtnID));
    userEvent.click(screen.getByTestId(dataTestIdBtns[2]));
    userEvent.type(screen.getByTestId(searchInputID), 'as');
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
  test('Verifica se é disparado um alert quando o filtro recebe uma busca errada (/meals)', async () => {
    global.alert = jest.fn();
    renderWithRouter(<App />, {}, '/meals');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(searchTopBtnID));
    userEvent.click(screen.getByTestId(dataTestIdBtns[0]));
    userEvent.type(screen.getByTestId(searchInputID), 'xablau');
    userEvent.click(screen.getByTestId(searchExecBtn));
  });
  test('Verifica se é disparado um alert quando o filtro recebe uma busca errada (/drinks)', async () => {
    global.alert = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFetch2),
    });
    renderWithRouter(<App />, {}, '/drinks');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(searchTopBtnID));
    userEvent.click(screen.getByTestId(dataTestIdBtns[0]));
    userEvent.type(screen.getByTestId(searchInputID), 'xablau');
    userEvent.click(screen.getByTestId(searchExecBtn));
  });
  test('Verifica se é renderizado a página da receita quando apenas um item é retornado (drinks)', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFetch2),
    });
    renderWithRouter(<App />, {}, '/drinks');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(searchTopBtnID));
    userEvent.click(screen.getByTestId(dataTestIdBtns[1]));
    userEvent.type(screen.getByTestId(searchInputID), 'Aquamarine');
    userEvent.click(screen.getByTestId(searchExecBtn));
  });
  test('Verifica se é renderizado a página da receita quando apenas um item é retornado (meals)', async () => {
    renderWithRouter(<App />, {}, '/meals');
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(searchTopBtnID));
    userEvent.click(screen.getByTestId(dataTestIdBtns[1]));
    userEvent.type(screen.getByTestId(searchInputID), 'Spicy Arrabiata Penne');
    userEvent.click(screen.getByTestId(searchExecBtn));
  });
});
