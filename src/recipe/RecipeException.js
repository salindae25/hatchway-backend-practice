module.exports = function RecipeException(message, code) {
  this.code = code || 400;
  this.message = message || 'Recipe already exists';
};
