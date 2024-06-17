import React, { createContext, useState, useEffect } from "react";
import { addUser, getUserByUsername } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await getUserByUsername(username);
    const user = response.data[0];
    if (user && user.password === password) {
      setUser(user);
      return user;
    }
    return null;
  };

  const register = async (username, name, password) => {
    const response = await getUserByUsername(username);
    if (response.data.length > 0) {
      return null;
    }
    const newUser = { username, name, password, role: "user" };
    await addUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
