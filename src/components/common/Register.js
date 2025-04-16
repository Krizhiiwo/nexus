import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { TextField, Button } from '@mui/material';
import './LoginSignup.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        secretKey,
      });

      console.log(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data.error || error.message);
      alert(error.response?.data.error || error.message);
    }
  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Welcome Back!</h2>
        <p>To keep connected with us please login with your personal info</p>
        <Link to="/login" className="center-button">
          <button>SIGN IN</button>
        </Link>
      </div>
      <div className="signup-section">
        <h2>Create Account</h2>
        <div className="social-buttons">
          <button><FacebookOutlinedIcon /></button>
          <button><GoogleIcon /></button>
        </div>
        <div className="or-divider">or use your email for registration</div>
        <div className="form-group">
          <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <TextField label="Secret Key (Admin Only)" variant="outlined" fullWidth margin="normal" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
        </div>
        <Button variant="contained" fullWidth onClick={handleRegister}>SIGN UP</Button>
      </div>
    </div>
  );
}