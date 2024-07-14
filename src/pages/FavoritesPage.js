import React, { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
  const { favorites, movies, removeFromFavorites } = useContext(MovieContext);

  const favoriteMovies = favorites.map(fav => {
    return movies.find(movie => movie.id === fav.movieId);
  });

  return (
    <div className="container mt-4">
      <h2>Your Favorites</h2>
      <Row>
        {favoriteMovies.map(movie => (
          movie ? (
            <Col md={3} key={movie.id} className="mb-4">
              <MovieCard movie={movie} />
              <Button onClick={() => removeFromFavorites(movie.id)} className="mt-2">Remove from Favorites</Button>
            </Col>
          ) : null
        ))}
      </Row>
    </div>
  );
};

export default FavoritesPage;
