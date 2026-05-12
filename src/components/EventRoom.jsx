import React from 'react';
import { Users, Clock, MapPin } from 'lucide-react';
import './EventRoom.css';

export default function EventRoom({ event }) {
  return (
    <div className="event-room glass-panel animate-fade-in">
      <div className="event-header">
        <h3>{event.title}</h3>
        <span className="event-badge">{event.type}</span>
      </div>
      <p className="event-desc">{event.description}</p>
      
      <div className="event-details">
        <div className="detail-item">
          <Clock size={16} />
          <span>{event.time}</span>
        </div>
        <div className="detail-item">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        <div className="detail-item">
          <Users size={16} />
          <span>{event.attendees} attending</span>
        </div>
      </div>
      
      <div className="event-actions">
        <button className="btn btn-primary">Join Room</button>
        <div className="attendee-avatars">
          {event.attendeeImages && event.attendeeImages.map((img, i) => (
            <img key={i} src={img} alt="Attendee" className="avatar" />
          ))}
        </div>
      </div>
    </div>
  );
}
