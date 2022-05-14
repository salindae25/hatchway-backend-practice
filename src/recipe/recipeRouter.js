const express = require('express');
const router = express.Router();
const RecipeService = require('./recipeService');

router.post('/recipes', async (req, res) => {
  const newRecipe = req.body;
  if (!newRecipe) res.status(201).send();
  try {
    await RecipeService.addRecipe(newRecipe);
    return res.status(201).send();
  } catch (err) {
    return res.status(err.code).send({ error: err.message });
  }
});
router.get('/recipes', (req, res) => {
  const recipeNames = RecipeService.getRecipeName();
  return res.send({ recipeNames });
});

router.get('/recipes/details/:name', async (req, res) => {
  const name = req.params.name;
  const details = await RecipeService.getRecipeDetail(name);
  if (!details) return res.send({});
  return res.send({ details });
});

router.put('/recipes', (req, res) => {
  return res.status(204).send();
});

module.exports = router;
