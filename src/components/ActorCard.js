import React from 'react';
import { Card } from 'react-bootstrap';

function ActorCard({ actor }) {
  return (
    <Card style={{ width: '300px', height: 'auto' }} className="text-center">
      <Card.Img variant="top" src={actor.profilePictureUrl} style={{ width: '100%', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{actor.name}</Card.Title>
        <Card.Text>
          <strong>Date of Birth:</strong> {actor.dateOfBirth}
        </Card.Text>
        <Card.Text >
          <strong>Biography:</strong> {actor.biography}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ActorCard;
