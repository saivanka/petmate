import React, { useState, useEffect } from 'react';
import { Activity, Edit2, Save, Camera } from 'lucide-react';
import './Profile.css';

export default function Profile({ username }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    dogName: 'Buddy',
    breed: 'Golden Retriever',
    age: '3',
    weight: '30',
    healthStatus: 'Healthy, up to date on vaccines.',
    lastVetVisit: '2023-10-15',
    foodBrand: 'Premium Kibble'
  });

  useEffect(() => {
    const savedData = localStorage.getItem(`petmate_profile_${username}`);
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(`petmate_profile_${username}`, JSON.stringify(profileData));
    setIsEditing(false);
  };

  return (
    <div className="container page-transition">
      <div className="profile-header glass-panel">
        <div className="profile-cover"></div>
        <div className="profile-info-container">
          <div className="profile-avatar">
            <Activity size={40} className="avatar-icon" />
            <button className="edit-avatar-btn">
              <Camera size={16} />
            </button>
          </div>
          <div className="profile-title">
            <h2>{profileData.dogName}</h2>
            <p className="owner-name">Owner: {username}</p>
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <button className="btn btn-primary" onClick={handleSave}>
                <Save size={18} /> Save Dashboard
              </button>
            ) : (
              <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
                <Edit2 size={18} /> Edit Tracker
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <h3>Breed</h3>
          {isEditing ? (
            <input type="text" name="breed" value={profileData.breed} onChange={handleChange} />
          ) : (
            <p className="stat-value">{profileData.breed}</p>
          )}
        </div>
        <div className="glass-panel stat-card">
          <h3>Age (Years)</h3>
          {isEditing ? (
            <input type="number" name="age" value={profileData.age} onChange={handleChange} />
          ) : (
            <p className="stat-value">{profileData.age}</p>
          )}
        </div>
        <div className="glass-panel stat-card">
          <h3>Weight (kg)</h3>
          {isEditing ? (
            <input type="number" name="weight" value={profileData.weight} onChange={handleChange} />
          ) : (
            <p className="stat-value">{profileData.weight}</p>
          )}
        </div>
      </div>

      <div className="health-section glass-panel">
        <h3>Health & Tracking</h3>
        <div className="health-form">
          <div className="form-group">
            <label>Health Status</label>
            {isEditing ? (
              <textarea name="healthStatus" value={profileData.healthStatus} onChange={handleChange} rows="3" />
            ) : (
              <p className="health-text">{profileData.healthStatus}</p>
            )}
          </div>
          <div className="form-group">
            <label>Last Vet Visit</label>
            {isEditing ? (
              <input type="date" name="lastVetVisit" value={profileData.lastVetVisit} onChange={handleChange} />
            ) : (
              <p className="health-text">{profileData.lastVetVisit}</p>
            )}
          </div>
          <div className="form-group">
            <label>Diet / Food Brand</label>
            {isEditing ? (
              <input type="text" name="foodBrand" value={profileData.foodBrand} onChange={handleChange} />
            ) : (
              <p className="health-text">{profileData.foodBrand}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
