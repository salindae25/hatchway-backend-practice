const express = require('express');
const router = express.Router();
const RecipeService = require('./recipeService');

router.get('/recipes', (req, res) => {
  const recipeNames = RecipeService.getRecipeName();
  return res.send({ recipeNames });
});

router.get('/recipes/details/:name', (req, res) => {
  const name = req.params.name;
  const details = RecipeService.getRecipeDetail(name);
  if (!details) return res.send({});
  return res.send({ details });
});

module.exports = router;
