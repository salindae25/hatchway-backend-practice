const request = require('supertest');
const { recipes: directRecipes } = require('../data/data.json');
const app = require('../src/app');

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
    expect(recipeNames).toEqual(directRecipes.map((x) => x.name));
  });
});
