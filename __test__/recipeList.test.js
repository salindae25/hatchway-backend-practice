const request = require('supertest');
const { recipes: directRecipes } = require('../data/data.json');
const { Recipe } = require('../src/recipe/Recipe');
const app = require('../src/app');

beforeEach(async () => {
  return await Recipe.set('recipes', directRecipes).write();
});

describe('Recipe List', () => {
  it('returns 200 ok when request send', async () => {
    const response = await request(app).get('/recipes').send();
    expect(response.status).toBe(200);
  });

  it('response body has property recipeNames when request send', async () => {
    const response = await request(app).get('/recipes').send();
    expect(Object.keys(response.body)).toEqual(['recipeNames']);
  });

  it('response body contain all the recipe names when request send', async () => {
    const response = await request(app).get('/recipes').send();
    const { recipeNames } = response.body;
    expect(recipeNames).toEqual(Recipe.get('recipes').map('name').value());
  });
});
