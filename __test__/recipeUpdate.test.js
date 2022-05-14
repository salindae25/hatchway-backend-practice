const request = require('supertest');
const { recipes: directRecipes } = require('../data/data.json');
const { Recipe } = require('../src/recipe/Recipe');
const app = require('../src/app');
const updateRecipe = () => {
  return request(app).put('/recipes');
};
const newRecipe = {
  name: 'butteredBagel',
  ingredients: ['1 bagel', 'butter'],
  instructions: ['cut the bagel', 'spread butter on bagel'],
};
beforeAll(async () => {
  return await Recipe.set('recipes', directRecipes).write();
});
afterEach(async () => {
  return await Recipe.set('recipes', directRecipes).write();
});
describe('Recipe Add', () => {
  it('return 201 ok response when recipe posted', async () => {
    await request(app).post('/recipes').send(newRecipe);
    const updateIngredient = ['1 bagel', '1kg butter'];
    const response = await updateRecipe().send({
      ...newRecipe,
      ingredients: updateIngredient,
    });
    expect(response.status).toBe(204);
  });

  it('updated recipe exist in datastore when updated valid recipe', async () => {
    await request(app).post('/recipes').send(newRecipe);
    const updateIngredient = ['1 bagel', '1kg butter'];
    await updateRecipe().send({ ...newRecipe, ingredients: updateIngredient });
    const recipeInDB = await Recipe.get('recipes')
      .find({ name: newRecipe.name })
      .value();
    expect(recipeInDB.ingredients).toEqual(updateIngredient);
  });
  it('return 404 error when updated a non-existing recipe', async () => {
    await request(app).post('/recipes').send(newRecipe);
    const updateIngredient = ['1 bagel', '1kg butter'];
    const response = await updateRecipe().send({
      name: 'not a recipe',
      ingredients: updateIngredient,
    });
    expect(response.status).toBe(404);
  });
  it('return proper error when posted a existing recipe', async () => {
    await request(app).post('/recipes').send(newRecipe);
    const updateIngredient = ['1 bagel', '1kg butter'];
    const response = await updateRecipe().send({
      name: 'not a recipe',
      ingredients: updateIngredient,
    });
    expect(Object.keys(response.body)).toEqual(['error']);
    expect(response.body.error).toBe('Recipe does not exist');
  });
});
