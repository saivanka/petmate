import React from 'react';
import PetCard from '../components/PetCard';
import './Home.css';

const MOCK_PETS = [
  {
    id: 1,
    name: 'Bella',
    breed: 'Golden Retriever',
    distance: '0.5 miles',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Siberian Husky',
    distance: '1.2 miles',
    image: 'https://images.unsplash.com/photo-1605568420125-4eb84e3141f1?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    name: 'Charlie',
    breed: 'French Bulldog',
    distance: '2.0 miles',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    name: 'Milo',
    breed: 'Maine Coon Cat',
    distance: '0.8 miles',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
  }
];

export default function Home() {
  return (
    <div className="home-page container page-transition">
      <header className="home-header">
        <h1>Discover Pet Friends Nearby</h1>
        <p>Connect, play, and share moments with local pets.</p>
      </header>
      
      <div className="pet-grid">
        {MOCK_PETS.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
