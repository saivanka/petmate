import React, { useState } from 'react';
import { PawPrint, Lock, User } from 'lucide-react';
import './Login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic for MVP
    if (username.trim()) {
      localStorage.setItem('petmate_user', username);
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel page-transition">
        <div className="login-header">
          <div className="login-logo">
            <PawPrint size={40} className="brand-icon" />
          </div>
          <h1>Welcome to Petmate</h1>
          <p>Sign in to track your pet's health and explore services.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn">
            Sign In
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#" onClick={(e) => e.preventDefault()}>Sign up</a></p>
          <p className="open-source-note">An Open Source Pet MVP</p>
        </div>
      </div>
    </div>
  );
}
