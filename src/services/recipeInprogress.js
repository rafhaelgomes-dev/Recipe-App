const verifyIsMeal = (recipe, arrayBool, setIsChecked) => {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!storage.comidas[recipe.id]) {
    setIsChecked(arrayBool);
    return;
  }
  if (storage.comidas[recipe.id].length === 0) {
    setIsChecked(arrayBool);
    return;
  }
  storage.comidas[recipe.id].forEach((e) => {
    arrayBool[e] = !arrayBool[e];
  });
  setIsChecked(arrayBool);
};

export default verifyIsMeal;
