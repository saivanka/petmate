import React, { useState } from 'react';
import { PawPrint, Dog, Cat, ArrowRight, HeartPulse, Store } from 'lucide-react';
import './Onboarding.css';

export default function Onboarding({ username, onComplete }) {
  const [step, setStep] = useState(1);
  const [petData, setPetData] = useState({
    dogName: '',
    breed: '',
    age: '',
    weight: '',
    healthStatus: 'Healthy',
    lastVetVisit: '',
    foodBrand: '',
    petType: 'dog',
    interests: {
      vet: true,
      store: true,
      grooming: true
    }
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const toggleInterest = (interest) => {
    setPetData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest]
      }
    }));
  };

  const handleFinish = () => {
    // Save to profile and mark as onboarded
    localStorage.setItem(`petmate_profile_${username}`, JSON.stringify(petData));
    localStorage.setItem(`petmate_onboarded_${username}`, 'true');
    onComplete();
  };

  return (
    <div className="onboarding-container page-transition">
      <div className="onboarding-card glass-panel">
        <div className="onboarding-header">
          <PawPrint size={32} className="brand-icon" />
          <h2>Welcome to Petmate, {username}!</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
          <p className="step-text">Step {step} of 3</p>
        </div>

        <div className="onboarding-content">
          {step === 1 && (
            <div className="step-content animate-fade-in">
              <h3>Let's meet your furry friend</h3>
              <div className="type-selector">
                <button 
                  className={`type-btn ${petData.petType === 'dog' ? 'selected' : ''}`}
                  onClick={() => setPetData({...petData, petType: 'dog'})}
                >
                  <Dog size={48} />
                  <span>Dog</span>
                </button>
                <button 
                  className={`type-btn ${petData.petType === 'cat' ? 'selected' : ''}`}
                  onClick={() => setPetData({...petData, petType: 'cat'})}
                >
                  <Cat size={48} />
                  <span>Cat</span>
                </button>
              </div>
              <div className="form-group mt-1">
                <label>What is their name?</label>
                <input 
                  type="text" 
                  value={petData.dogName} 
                  onChange={e => setPetData({...petData, dogName: e.target.value})} 
                  placeholder="e.g. Buddy, Luna..."
                />
              </div>
              <div className="form-group mt-1">
                <label>Breed</label>
                <input 
                  type="text" 
                  value={petData.breed} 
                  onChange={e => setPetData({...petData, breed: e.target.value})} 
                  placeholder="e.g. Golden Retriever..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-fade-in">
              <h3>Basic Health Info</h3>
              <p className="text-muted">You can always update this later in your profile.</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Age (Years)</label>
                  <input 
                    type="number" 
                    value={petData.age} 
                    onChange={e => setPetData({...petData, age: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input 
                    type="number" 
                    value={petData.weight} 
                    onChange={e => setPetData({...petData, weight: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content animate-fade-in">
              <h3>What are you looking for?</h3>
              <p className="text-muted">We'll customize your map based on what you need.</p>
              
              <div className="interests-grid">
                <button 
                  className={`interest-btn ${petData.interests.vet ? 'selected' : ''}`}
                  onClick={() => toggleInterest('vet')}
                >
                  <HeartPulse size={24} />
                  <span>Veterinarians</span>
                </button>
                <button 
                  className={`interest-btn ${petData.interests.store ? 'selected' : ''}`}
                  onClick={() => toggleInterest('store')}
                >
                  <Store size={24} />
                  <span>Pet Stores</span>
                </button>
                <button 
                  className={`interest-btn ${petData.interests.grooming ? 'selected' : ''}`}
                  onClick={() => toggleInterest('grooming')}
                >
                  <PawPrint size={24} />
                  <span>Grooming</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="onboarding-footer">
          {step > 1 ? (
            <button className="btn btn-outline" onClick={handleBack}>Back</button>
          ) : <div></div>}
          
          {step < 3 ? (
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={step === 1 && !petData.dogName.trim()}
            >
              Continue <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleFinish}>
              Let's Go!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
