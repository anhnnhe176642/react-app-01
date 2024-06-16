import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import WatchLaterPage from './pages/WatchLaterPage';
import UserAccountPage from './pages/UserAccountPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/watch-later" element={<WatchLaterPage />} />
          <Route path="/account" element={<UserAccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
