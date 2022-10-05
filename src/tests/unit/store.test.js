describe('redux/store.js', () => {
  test('should can import without errors', () => {
    expect(() => import('../../redux/store')).not.toThrow();
  });
});
