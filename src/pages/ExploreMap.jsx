import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Store, Stethoscope, Scissors } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import './ExploreMap.css';

const ALL_MOCK_SERVICES = [
  {
    id: 1,
    name: 'Paws & Play Pet Store',
    type: 'store',
    position: [40.7128, -74.0060],
    description: 'Premium pet food and toys.'
  },
  {
    id: 2,
    name: 'City Vet Clinic',
    type: 'vet',
    position: [40.7148, -74.0040],
    description: '24/7 emergency care and checkups.'
  },
  {
    id: 3,
    name: 'Fluffy Cuts Grooming',
    type: 'grooming',
    position: [40.7108, -74.0080],
    description: 'Professional pet grooming services.'
  },
  {
    id: 4,
    name: 'Feline Friendly Vets',
    type: 'vet',
    position: [40.7115, -74.0100],
    description: 'Specialized veterinary care for cats.'
  },
  {
    id: 5,
    name: 'K9 Training & Agility',
    type: 'store',
    position: [40.7160, -74.0020],
    description: 'Dog training supplies and accessories.'
  }
];

const getIconForType = (type) => {
  switch (type) {
    case 'store': return <Store size={20} color="white" />;
    case 'vet': return <Stethoscope size={20} color="white" />;
    case 'grooming': return <Scissors size={20} color="white" />;
    default: return <Store size={20} color="white" />;
  }
};

const getColorForType = (type) => {
  switch (type) {
    case 'store': return 'var(--primary)';
    case 'vet': return 'var(--secondary)';
    case 'grooming': return 'var(--accent)';
    default: return 'var(--primary)';
  }
};

const createCustomServiceIcon = (service) => {
  const iconHtml = renderToString(getIconForType(service.type));
  const bgColor = getColorForType(service.type);
  
  return divIcon({
    className: 'custom-service-marker',
    html: `<div class="service-marker-icon" style="background-color: ${bgColor}">${iconHtml}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export default function ExploreMap({ username }) {
  const centerPosition = [40.7128, -74.0060];
  const [services, setServices] = useState(ALL_MOCK_SERVICES);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem(`petmate_profile_${username}`);
    if (savedData) {
      const parsedProfile = JSON.parse(savedData);
      setProfile(parsedProfile);
      
      // Filter services based on interests if they exist
      if (parsedProfile.interests) {
        const filtered = ALL_MOCK_SERVICES.filter(service => {
          // Keep if user is interested in this type
          return parsedProfile.interests[service.type];
        });
        setServices(filtered);
      }
    }
  }, [username]);

  return (
    <div className="explore-page container page-transition">
      <header className="explore-header">
        <h1>Pet Services Map</h1>
        {profile ? (
          <p>Showing personalized services for {profile.dogName} ({profile.petType}).</p>
        ) : (
          <p>Find pet stores, vets, and grooming near you.</p>
        )}
      </header>
      
      <div className="map-container glass-panel">
        <MapContainer center={centerPosition} zoom={14} scrollWheelZoom={false} className="leaflet-map">
          {/* Custom Theme TileLayer - CartoDB Positron */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {services.map(service => (
            <Marker key={service.id} position={service.position} icon={createCustomServiceIcon(service)}>
              <Popup>
                <div className="pet-popup">
                  <strong>{service.name}</strong>
                  <br />
                  <span>{service.description}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="recent-activity">
        <h2>Nearby Services</h2>
        <div className="activity-list glass-panel">
          {services.length > 0 ? services.map(service => (
            <div className="activity-item" key={service.id}>
              <div className="activity-dot" style={{ backgroundColor: getColorForType(service.type) }}></div>
              <p><strong>{service.name}</strong> - {service.description}</p>
            </div>
          )) : (
            <p className="text-muted" style={{ padding: '1rem', textAlign: 'center' }}>
              No services matched your preferences. Try updating your profile interests.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
