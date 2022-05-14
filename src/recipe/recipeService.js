const { recipes } = require('../../data/data.json');

const getRecipeName = () => {
  return recipes.map((recipe) => recipe.name);
};

module.exports = {
  getRecipeName,
};
