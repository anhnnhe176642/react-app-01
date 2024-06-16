import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const { movies, searchResults, handleSearch } = useContext(MovieContext);

  const displayMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="movie-list">
        {displayMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
