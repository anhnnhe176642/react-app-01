import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import UserAccountPage from "./pages/UserAccountPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMoviesPage from "./pages/AdminMoviesPage";
import MovieForm from "./components/MovieForm";
import AdminGenresPage from "./pages/AdminGenresPage";
import GenreForm from "./components/GenreForm";
import AdminActorsPage from "./pages/AdminActorsPage";
import ActorForm from "./components/ActorForm";
import { Container } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Header />
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies/:id" element={<MovieDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/watch-later" element={<WatchLaterPage />} />
                <Route path="/account" element={<UserAccountPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/favorites" element={<FavoritesPage/>} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/movies" element={<ProtectedRoute><AdminMoviesPage /></ProtectedRoute>} />
                <Route path="/admin/movies/add" element={<ProtectedRoute><MovieForm /></ProtectedRoute>} />
                <Route path="/admin/movies/edit/:id" element={<ProtectedRoute><MovieForm /></ProtectedRoute>} />
                <Route path="/admin/genres" element={<ProtectedRoute><AdminGenresPage /></ProtectedRoute>} />
                <Route path="/admin/genres/add" element={<ProtectedRoute><GenreForm /></ProtectedRoute>} />
                <Route path="/admin/genres/edit/:id" element={<ProtectedRoute><GenreForm /></ProtectedRoute>} />
                <Route path="/admin/actors" element={<ProtectedRoute><AdminActorsPage /></ProtectedRoute>} />
                <Route path="/admin/actors/add" element={<ProtectedRoute><ActorForm /></ProtectedRoute>} />
                <Route path="/admin/actors/edit/:id" element={<ProtectedRoute><ActorForm /></ProtectedRoute>} />
              </Routes>
            </div>
        </Router>
        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
