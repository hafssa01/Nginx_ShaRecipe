import express from 'express';
import RecipeController from '../controllers/recipeController.js'; // Make sure to include the .js extension

const router = express.Router();

router.get('/', RecipeController.getAllRecipes);
router.get('/:id', RecipeController.getRecipeById);
router.post('/', RecipeController.createRecipe);
router.put('/:id', RecipeController.updateRecipe);
router.delete('/:id', RecipeController.deleteRecipe);

export default router;
