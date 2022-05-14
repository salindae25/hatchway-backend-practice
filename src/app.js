const express = require('express');
const recipeRouter = require('./recipe/recipeRouter');
const app = express();
app.use(express.json());
app.use(recipeRouter);

module.exports = app;
