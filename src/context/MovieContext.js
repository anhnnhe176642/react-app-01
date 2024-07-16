import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [genres, setGenres] = useState([]);
  const { user } = useContext(AuthContext); // Get the current user from AuthContext

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
      if (!user) return;
      const userId = user.id;
      try {
        const response = await axios.get("http://localhost:9999/favorites");
        setFavorites(response.data.filter(f=>f.userId===userId));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [user]);

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
    if (!user) return;

    const userId = user.id;
    const exists = favorites.some(fav => fav.movieId === movie.id && fav.userId === userId);

    if (!exists) {
      try {
        const response = await axios.post(
          "http://localhost:9999/favorites",
          { userId, movieId: movie.id }
        );
        setFavorites([...favorites, response.data]);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  const removeFromFavorites = async (movieId) => {
    if (!user) return;

    const userId = user.id;
    try {
      const favorite = favorites.find(fav => fav.movieId === movieId && fav.userId === userId);
      if (favorite) {
        await axios.delete(`http://localhost:9999/favorites/${favorite.id}`);
        setFavorites(favorites.filter(fav => fav.id !== favorite.id));
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
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
        removeFromFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieProvider, MovieContext };
