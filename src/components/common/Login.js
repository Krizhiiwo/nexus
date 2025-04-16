import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import './LoginSignup.css';

function LoginSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      console.log("Login successful:", response.data);
      alert("Login successful!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="signup-section">
        <h2>Login to Your Account</h2>
        <div className="social-buttons">
          <button><FacebookOutlinedIcon /></button>
          <button><GoogleIcon /></button>
        </div>
        <div className="or-divider">Login using social network</div>
        <div className="form-group">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>SIGN IN</button>
      </div>
      <div className="login-section">
        <h2>New Here?</h2>
        <p>Sign up and discover a great amount of new opportunities</p>
        <Link to="/register" className="center-button">
          <button>SIGN UP</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginSignup;