const { recipes } = require('../../data/data.json');

const getRecipeName = () => {
  return recipes.map((recipe) => recipe.name);
};

const getRecipeDetail = (name) => {
  const recipe = recipes.find((recipe) => recipe.name === name);
  if (!recipe) return null;
  return {
    ingredients: recipe.ingredients || {},
    numSteps: recipe.instructions.length,
  };
};

module.exports = {
  getRecipeName,
  getRecipeDetail,
};
