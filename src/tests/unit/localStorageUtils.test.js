import * as localStorageUtils from '../../utils/localStorageUtils';

const TEST_KEY = 'test-key';

beforeEach(() => {
  jest.spyOn(Storage.prototype, 'getItem');
  jest.spyOn(Storage.prototype, 'setItem');
});

describe('utils/localStorageUtils.js - readStorage()', () => {
  test('should calls Storage.getItem with received key', () => {
    localStorageUtils.readStorage(TEST_KEY);

    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith(TEST_KEY);
  });

  test('should returns value parsed', () => {
    const data = {
      id: 1,
      content: 'Hello World',
    };

    localStorage.getItem.mockReturnValue(JSON.stringify(data));

    const output = localStorageUtils.readStorage(TEST_KEY);

    expect(output).toEqual(data);
  });

  test('should returns fallback value when Storage is empty', () => {
    const fallback = 'test-fallback';

    const output = localStorageUtils.readStorage(TEST_KEY, fallback);

    expect(output).toEqual(fallback);
  });
});

describe('utils/localStorageUtils.js - writeStorage()', () => {
  test('should calls Storage.setItem with received key', () => {
    localStorageUtils.writeStorage(TEST_KEY, 'any');

    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith(TEST_KEY, expect.any(String));
  });

  test('should calls Storage.setItem with received value stringified', () => {
    const input = {
      id: 1,
      content: 'Hello World',
    };

    localStorageUtils.writeStorage(TEST_KEY, input);

    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith(TEST_KEY, JSON.stringify(input));
  });
});
