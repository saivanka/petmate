import React from 'react';
import { MapPin } from 'lucide-react';
import './PetCard.css';

export default function PetCard({ pet }) {
  return (
    <div className="pet-card glass-panel animate-fade-in">
      <div className="pet-image-container">
        <img src={pet.image} alt={pet.name} className="pet-image" />
      </div>
      <div className="pet-info">
        <h3>{pet.name}</h3>
        <p className="pet-breed">{pet.breed}</p>
        <div className="pet-location">
          <MapPin size={16} />
          <span>{pet.distance} away</span>
        </div>
        <button className="btn btn-primary btn-connect">Connect</button>
      </div>
    </div>
  );
}
