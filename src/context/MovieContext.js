import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:9999/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:9999/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await axios.get("http://localhost:9999/watch-later");
        setWatchLater(response.data);
      } catch (error) {
        console.error("Error fetching watch later movies:", error);
      }
    };
    fetchWatchLater();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:9999/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleSearch = (query) => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const addToFavorites = async (movie) => {
    try {
      const response = await axios.post(
        "http://localhost:9999/favorites",
        movie
      );
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const addToWatchLater = async (movie) => {
    try {
      const response = await axios.post(
        "http://localhost:9999/watch-later",
        movie
      );
      setWatchLater([...watchLater, response.data]);
    } catch (error) {
      console.error("Error adding to watch later:", error);
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/favorites/${id}`);
      setFavorites(favorites.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const removeFromWatchLater = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/watch-later/${id}`);
      setWatchLater(watchLater.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error removing from watch later:", error);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        searchResults,
        setSearchResults,
        favorites,
        watchLater,
        genres,
        handleSearch,
        addToFavorites,
        addToWatchLater,
        removeFromFavorites,
        removeFromWatchLater,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieProvider, MovieContext };
