import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";

const GoogleSignup = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    setUser(details);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(details));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <div className="container mt-5 text-center">
      {isLoggedIn && user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleOAuthProvider clientId="85792757464-4cer7qi0js1n067bhd9ca0ovcdcan1qg.apps.googleusercontent.com">
          <div className="d-flex justify-content-center">
           <GoogleLogin
             onSuccess={handleLoginSuccess}
             onError={() => console.log('Login Failed')}
             className="btn btn-primary w-100"
           />
           </div>
        </GoogleOAuthProvider>
      )}
    </div>
  );
};

export default GoogleSignup;
