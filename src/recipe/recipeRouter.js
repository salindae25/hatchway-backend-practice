const express = require('express');
const router = express.Router();
const RecipeService = require('./recipeService');

router.get('/recipes', (req, res) => {
  const recipeNames = RecipeService.getRecipeName();
  return res.send({ recipeNames });
});

module.exports = router;
