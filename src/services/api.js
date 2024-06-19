import axios from "axios";

const API_URL = "http://localhost:9999";

export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserByUsername = (username) =>
  axios.get(`${API_URL}/users?username=${username}`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_URL}/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getMovies = () => {
  return axios.get(`${API_URL}/movies`);
};

export const getMovieById = (id) => {
  return axios.get(`${API_URL}/movies/${id}`);
};

export const addMovie = (movie) => {
  return axios.post(`${API_URL}/movies`, movie);
};

export const updateMovie = (movie) => {
  return axios.put(`${API_URL}/movies/${movie.id}`, movie);
};

export const deleteMovie = (id) => {
  return axios.delete(`${API_URL}/movies/${id}`);
};

export const getGenres = () => {
  return axios.get(`${API_URL}/genres`);
};

export const getGenreById = (id) => {
  return axios.get(`${API_URL}/genres/${id}`);
};

export const addGenre = (genre) => {
  return axios.post(`${API_URL}/genres`, genre);
};

export const updateGenre = (genre) => {
  return axios.put(`${API_URL}/genres/${genre.id}`, genre);
};

export const deleteGenre = (id) => {
  return axios.delete(`${API_URL}/genres/${id}`);
};
