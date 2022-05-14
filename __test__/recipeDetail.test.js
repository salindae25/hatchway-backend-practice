const request = require('supertest');
const { recipes: directRecipes } = require('../data/data.json');
const app = require('../src/app');
const getDetails = (name = 'garlicPasta') => {
  return request(app).get('/recipes/details/' + name);
};
describe('Recipe Detail with preparation', () => {
  it('returns 200 ok when request send', async () => {
    const response = await await getDetails().send();
    expect(response.status).toBe(200);
  });

  it('response body contain details property ok when request send', async () => {
    const response = await getDetails().send();
    expect(Object.keys(response.body)).toEqual(['details']);
  });
  it('response body.details contain ingredients and numSteps when request send', async () => {
    const response = await getDetails().send();
    expect(Object.keys(response.body.details)).toEqual([
      'ingredients',
      'numSteps',
    ]);
  });
  it('response body.details.ingredients contain all ingredients for recipe', async () => {
    const response = await getDetails().send();
    const ingredientsFromRecipe = directRecipes.find(
      (x) => x.name === 'garlicPasta'
    ).ingredients;
    expect(response.body.details.ingredients).toEqual(ingredientsFromRecipe);
  });
  it('response body.details.numSteps contain all ingredients for recipe', async () => {
    const response = await getDetails().send();
    const instructionsForRecipe = directRecipes.find(
      (x) => x.name === 'garlicPasta'
    ).instructions;
    expect(response.body.details.numSteps).toEqual(
      instructionsForRecipe.length
    );
  });
  it('response empty object when request send with recipe that does not exist', async () => {
    const response = await getDetails('none').send();
    expect(response.body).toEqual({});
  });
});
