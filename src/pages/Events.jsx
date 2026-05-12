import React from 'react';
import EventRoom from '../components/EventRoom';
import { Plus } from 'lucide-react';
import './Events.css';

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Weekend Dog Park Playdate',
    type: 'Dog Meetup',
    description: 'Join us for a sunny afternoon at the Central Bark park. All friendly dogs welcome!',
    time: 'Saturday, 2:00 PM',
    location: 'Central Bark Park',
    attendees: 12,
    attendeeImages: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80'
    ]
  },
  {
    id: 2,
    title: 'Cat Owners Coffee Morning',
    type: 'Social',
    description: 'A relaxed meetup for cat parents to share stories and tips over coffee (no pets for this one).',
    time: 'Sunday, 10:00 AM',
    location: 'Paws & Claws Cafe',
    attendees: 8,
    attendeeImages: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80'
    ]
  }
];

export default function Events() {
  return (
    <div className="events-page container page-transition">
      <header className="events-header">
        <div>
          <h1>Pet Meetup Rooms</h1>
          <p>Find or create events for you and your furry friend.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} /> Create Room
        </button>
      </header>
      
      <div className="events-list">
        {MOCK_EVENTS.map(event => (
          <EventRoom key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
