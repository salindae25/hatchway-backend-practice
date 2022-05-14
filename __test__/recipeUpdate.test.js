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
  fit('return 201 ok response when recipe posted', async () => {
    const response = await addRecipe();
    expect(response.status).toBe(204);
  });

  it('added recipe exist in datastore when posted valid recipe', async () => {
    const response = await request(app).post('/recipes').send(newRecipe);
    const recipeInDB = await Recipe.get('recipes')
      .find({ name: newRecipe.name })
      .value();
    expect(recipeInDB).toBeTruthy();
  });
  it('return 404 error when posted a existing recipe', async () => {
    await request(app).post('/recipes').send(newRecipe);
    const response = await request(app).post('/recipes').send(newRecipe);
    expect(response.status).toBe(400);
  });
  it('return proper error when posted a existing recipe', async () => {
    await request(app).post('/recipes').send(newRecipe);
    const response = await request(app).post('/recipes').send(newRecipe);
    expect(Object.keys(response.body)).toEqual(['error']);
    expect(response.body.error).toBe('Recipe already exists');
  });
});
