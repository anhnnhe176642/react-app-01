import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import UserAccountPage from "./pages/UserAccountPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMoviesPage from "./pages/AdminMoviesPage";
import MovieForm from "./components/MovieForm";
import AdminGenresPage from "./pages/AdminGenresPage";
import GenreForm from "./components/GenreForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/watch-later" element={<WatchLaterPage />} />
            <Route path="/account" element={<UserAccountPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/movies" element={<AdminMoviesPage />} />
            <Route path="/admin/movies/add" element={<MovieForm />} />
            <Route path="/admin/movies/edit/:id" element={<MovieForm />} />
            <Route path="/admin/genres" element={<AdminGenresPage />} />
            <Route path="/admin/genres/add" element={<GenreForm />} />
            <Route path="/admin/genres/edit/:id" element={<GenreForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
