const { Recipe } = require('./Recipe');
const RecipeException = require('./RecipeException');

const getRecipeName = () => {
  return Recipe.get('recipes').map('name');
};

const getRecipeDetail = async (name = '') => {
  const recipe = await Recipe.get('recipes').find({ name: name }).value();
  if (!recipe) return null;
  return {
    ingredients: recipe.ingredients || {},
    numSteps: recipe.instructions.length,
  };
};
const addRecipe = async (recipe) => {
  const recipeInDb = await Recipe.get('recipes')
    .find({ name: recipe.name })
    .value();
  if (!recipe) return 0;
  if (recipeInDb) throw new RecipeException();
  await Recipe.get('recipes').push(recipe).write();
};
const updateRecipe = (recipe) => {
  const recipeInDb = Recipe.get('recipes').find({ name: recipe?.name });
  if (!recipeInDb.value())
    throw new RecipeException('Recipe does not exist', 404);
  recipeInDb.assign({ ...recipe }).write();
};
module.exports = {
  getRecipeName,
  getRecipeDetail,
  addRecipe,
  updateRecipe,
};
