import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

function FavoritesPage() {
  const { favorites } = useContext(MovieContext);

  return (
    <div>
      <h1>Favorites</h1>
      <div className="movie-list">
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
