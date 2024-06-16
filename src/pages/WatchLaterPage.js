import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

function WatchLaterPage() {
  const { watchLater } = useContext(MovieContext);

  return (
    <div>
      <h1>Watch Later</h1>
      <div className="movie-list">
        {watchLater.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default WatchLaterPage;
