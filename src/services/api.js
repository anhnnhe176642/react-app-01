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
