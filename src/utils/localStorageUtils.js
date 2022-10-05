function readStorage(key, fallback = undefined) {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export { readStorage, writeStorage };
