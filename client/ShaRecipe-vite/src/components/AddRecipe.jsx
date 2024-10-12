import React, { useState } from 'react';
import { Form, Button, Col, Row, Toast, ToastContainer, Card } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './Navscroll';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Vegan',
    ingredients: '',
    prepTime: '',
    cookTime: ''
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update errors in real-time
    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const validate = (formData) => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    }

    if (!formData.prepTime || isNaN(formData.prepTime)) {
      newErrors.prepTime = 'Preparation time must be a number';
    }

    if (!formData.cookTime || isNaN(formData.cookTime)) {
      newErrors.cookTime = 'Cook time must be a number';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      console.log({email, password});
      axios.post('/api/recipes', {...formData, email: email, password: password})
        .then((response) => {
          console.log('Recipe added successfully:', response.data);
          setShowToast(true);
          setToastMessage('Recipe added successfully!');
          navigate("/recipes");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const navigate = useNavigate();

  return (
    <>
    <NavBar/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Add Recipe</h2>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group controlId="title">
            <Form.Label>Recipe Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Category */}
          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            >
              <option value="Vegan">Vegan</option>
              <option value="Pasta">Pasta</option>
              <option value="Dessert">Dessert</option>
              <option value="Soup">Soup</option>
              <option value="Dinner">Dinner</option>
              <option value="Lunch">Lunch</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Pizza">Pizza</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Ingredients */}
          <Form.Group controlId="ingredients" className="mt-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              name="ingredients"
              rows={4}
              value={formData.ingredients}
              onChange={handleChange}
              isInvalid={!!errors.ingredients}
              placeholder='Dough, Water, Tomato'
            />
            <Form.Control.Feedback type="invalid">
              {errors.ingredients}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Preparation Time */}
          <Row className="mt-3">
            <Col sm={6}>
              <Form.Group controlId="prepTime">
                <Form.Label>Preparation Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  isInvalid={!!errors.prepTime}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.prepTime}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Cook Time */}
            <Col sm={6}>
              <Form.Group controlId="cookTime">
                <Form.Label>Cook Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleChange}
                  isInvalid={!!errors.cookTime}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cookTime}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <Button className="mt-4 w-100" variant="primary" type="submit">
            Add Recipe
          </Button>
        </Form>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
    <Footer/>
    </>
  );
};

export default AddRecipeForm;
