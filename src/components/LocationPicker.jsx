import React from 'react';
import { Map as MapIcon, Crosshair } from 'lucide-react';
import './LocationPicker.css';

export default function LocationPicker() {
  return (
    <div className="location-picker glass-panel animate-fade-in">
      <div className="picker-header">
        <MapIcon size={24} className="text-primary" />
        <h3>Set Pet Location</h3>
      </div>
      <div className="map-placeholder">
        <div className="radar-animation">
          <div className="radar-circle"></div>
          <div className="radar-circle delay-1"></div>
          <div className="radar-circle delay-2"></div>
        </div>
        <button className="btn btn-primary locate-btn">
          <Crosshair size={18} /> Use Current Location
        </button>
      </div>
      <p className="location-hint">Allow location access to find pet friends nearby.</p>
    </div>
  );
}
