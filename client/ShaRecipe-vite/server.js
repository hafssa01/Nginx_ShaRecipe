import express from 'express';
import cors from 'cors';
import RecipeRoutes from './routes/recipe.js'; // Adjust path if necessary
import AuthRoutes from './routes/auth.js'; // Import your Auth routes

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send('<h1>Hello Express</h1>'));


app.use('/api/recipes', RecipeRoutes);
app.use('/api/auth', AuthRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});
