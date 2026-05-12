import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PawPrint, Map, Calendar, User, MessageCircle, LogOut } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <PawPrint className="brand-icon" size={28} />
        <span className="brand-text">Petmate</span>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <PawPrint size={20} />
          <span>Home</span>
        </Link>
        <Link to="/map" className={`nav-link ${isActive('/map')}`}>
          <Map size={20} />
          <span>Map</span>
        </Link>
        <Link to="/events" className={`nav-link ${isActive('/events')}`}>
          <Calendar size={20} />
          <span>Events</span>
        </Link>
        <Link to="/chat" className={`nav-link ${isActive('/chat')}`}>
          <MessageCircle size={20} />
          <span>AI Vet</span>
        </Link>
        <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
          <User size={20} />
          <span>Profile</span>
        </Link>
        <button onClick={onLogout} className="nav-link logout-btn" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
