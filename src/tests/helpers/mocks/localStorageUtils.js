jest.mock('../../../utils/localStorageUtils', () => ({
  readStorage: jest.fn(),
  writeStorage: jest.fn(),
}));
