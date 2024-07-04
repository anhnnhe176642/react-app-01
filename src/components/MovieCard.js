import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function MovieCard({ movie }) {
  const { genres } = useContext(MovieContext);
  const genre = genres.find(g => g.id === movie.genreId);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card className="movie-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card.Img variant="top" src={movie.imgUrl} className="card-img-top" />
      <Card.Body className="card-body">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          Genre: {genre ? genre.name : 'Unknown'}
        </Card.Text>
        <Card.Text>
          Rating: {movie.rating}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
