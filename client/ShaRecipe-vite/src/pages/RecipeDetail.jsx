// src/pages/RecipeDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import NavBar from '../components/Navscroll';
import Footer from '../components/Footer';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <NavBar/>
    <div className="container">
      <h1>{recipe.title}</h1>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{recipe.category}</Card.Subtitle>
          <Card.Text>
            <strong>Prep Time:</strong> {recipe.prepTime} minutes<br />
            <strong>Cook Time:</strong> {recipe.cookTime} minutes<br />
            <strong>Ingredients:</strong>
            <ul>
              {recipe.ingredients.split(', ').map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    <Footer/>
    </>
  );
};

export default RecipeDetail;
