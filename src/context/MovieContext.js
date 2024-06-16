import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9999/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9999/favorites')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9999/watch-later')
      .then(response => {
        setWatchLater(response.data);
      })
      .catch(error => console.error('Error fetching watch later movies:', error));
  }, []);

  const handleSearch = (query) => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const addToFavorites = (movie) => {
    axios.post('http://localhost:9999/favorites', movie)
      .then(response => {
        setFavorites([...favorites, response.data]);
      })
      .catch(error => console.error('Error adding to favorites:', error));
  };

  const addToWatchLater = (movie) => {
    axios.post('http://localhost:9999/watch-later', movie)
      .then(response => {
        setWatchLater([...watchLater, response.data]);
      })
      .catch(error => console.error('Error adding to watch later:', error));
  };

  const removeFromFavorites = (id) => {
    axios.delete(`http://localhost:9999/favorites/${id}`)
      .then(() => {
        setFavorites(favorites.filter(movie => movie.id !== id));
      })
      .catch(error => console.error('Error removing from favorites:', error));
  };

  const removeFromWatchLater = (id) => {
    axios.delete(`http://localhost:9999/watch-later/${id}`)
      .then(() => {
        setWatchLater(watchLater.filter(movie => movie.id !== id));
      })
      .catch(error => console.error('Error removing from watch later:', error));
  };

  return (
    <MovieContext.Provider value={{
      movies, searchResults, favorites, watchLater, handleSearch,
      addToFavorites, addToWatchLater, removeFromFavorites, removeFromWatchLater
    }}>
      {children}
    </MovieContext.Provider>
  );
};


export { MovieProvider, MovieContext };
