import React from 'react';
import { Card } from 'react-bootstrap';

function MovieCard({ movie }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.poster} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
