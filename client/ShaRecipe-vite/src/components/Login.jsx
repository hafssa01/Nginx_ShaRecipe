import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navscroll";
import Footer from "./Footer";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update errors in real-time
    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const validate = (formData) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setErrors(data.errors || {});
            setShowToast(true);
            setToastMessage(data.error);
          } else {
            console.log(formData);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('email', formData.email);
            localStorage.setItem('password', formData.password);
            // Reset form and errors
            setFormData({ email: '', password: '' });
            setErrors({});
            console.log(data);

            setShowToast(true);
            setToastMessage('Login successful!');
            navigate("/");
          }
        })
        .catch(error => {
          console.error('Login error:', error);
          setShowToast(true);
          setToastMessage('Login failed, please try again!');
        });
    }
  };

  const navigate = useNavigate();

  return (
    <>
    <NavBar/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="mt-4 w-100" variant="primary" type="submit">
            Login
          </Button>

          <p className="text-center mt-3">
            Don't have an account? <a href="/register" className="text-primary">Register</a>
          </p>
        </Form>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
    <Footer/>
    </>
  );
};

export default LoginForm;
