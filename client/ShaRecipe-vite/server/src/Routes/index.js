import express from 'express';
import recipeRouter from './recipe.js'; // Adjust the path if needed
import userRouter from './users.js'; // Adjust the path if needed
import authRouter from './auth.js'; // Adjust the path if needed

const router = express.Router();

router.use('/recipes', recipeRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
