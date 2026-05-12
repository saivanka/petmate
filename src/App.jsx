import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ExploreMap from './pages/ExploreMap';
import Events from './pages/Events';
import Login from './pages/Login';
import AIChat from './pages/AIChat';
import Onboarding from './pages/Onboarding';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('petmate_user');
    if (savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
      
      const onboarded = localStorage.getItem(`petmate_onboarded_${savedUser}`);
      if (onboarded) {
        setIsOnboarded(true);
      }
    }
  }, []);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUser(username);
    
    const onboarded = localStorage.getItem(`petmate_onboarded_${username}`);
    if (onboarded) {
      setIsOnboarded(true);
    } else {
      setIsOnboarded(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('petmate_user');
    setIsAuthenticated(false);
    setUser(null);
    setIsOnboarded(false);
  };

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (!isOnboarded) {
    return <Onboarding username={user} onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<ExploreMap username={user} />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile username={user} />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
