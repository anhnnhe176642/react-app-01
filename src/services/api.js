import axios from "axios";

const API_URL = "http://localhost:9999";

// User APIs
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserByUsername = (username) =>
  axios.get(`${API_URL}/users?username=${username}`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = (user) => axios.put(`${API_URL}/users/${user.id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Movie APIs
export const getMovies = () => axios.get(`${API_URL}/movies`);
export const getMovieById = (id) => axios.get(`${API_URL}/movies/${id}`);
export const addMovie = (movie) => axios.post(`${API_URL}/movies`, movie);
export const updateMovie = (movie) => axios.put(`${API_URL}/movies/${movie.id}`, movie);
export const deleteMovie = (id) => axios.delete(`${API_URL}/movies/${id}`);

// Genre APIs
export const getGenres = () => axios.get(`${API_URL}/genres`);
export const getGenreById = (id) => axios.get(`${API_URL}/genres/${id}`);
export const addGenre = (genre) => axios.post(`${API_URL}/genres`, genre);
export const updateGenre = (genre) => axios.put(`${API_URL}/genres/${genre.id}`, genre);
export const deleteGenre = (id) => axios.delete(`${API_URL}/genres/${id}`);

// Actor APIs
export const getActors = () => axios.get(`${API_URL}/actors`);
export const getActorById = (id) => axios.get(`${API_URL}/actors/${id}`);
export const addActor = (actor) => axios.post(`${API_URL}/actors`, actor);
export const updateActor = (actor) => axios.put(`${API_URL}/actors/${actor.id}`, actor);
export const deleteActor = (id) => axios.delete(`${API_URL}/actors/${id}`);
