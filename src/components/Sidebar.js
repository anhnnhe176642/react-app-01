import React, { useContext, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import './Sidebar.css'; 

const Sidebar = () => {
  const { movies, setSearchResults } = useContext(MovieContext);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [selectedActors, setSelectedActors] = useState(new Set());
  const [rating, setRating] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9999/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));

    axios.get('http://localhost:9999/actors')
      .then(response => setActors(response.data))
      .catch(error => console.error('Error fetching actors:', error));
  }, []);

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres(prevSelected => {
      const newSelected = new Set(prevSelected);
      checked ? newSelected.add(value) : newSelected.delete(value);
      return newSelected;
    });
  };

  const handleActorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedActors(prevSelected => {
      const newSelected = new Set(prevSelected);
      checked ? newSelected.add(value) : newSelected.delete(value);
      return newSelected;
    });
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleFilter = () => {
    const filteredMovies = movies.filter(movie => {
      const genreMatch = selectedGenres.size === 0 || selectedGenres.has(movie.genreId.toString());
      const actorMatch = selectedActors.size === 0 || movie.actors.some(actor => selectedActors.has(actor.toString()));
      const ratingMatch = rating === '' || movie.rating >= rating;
      return genreMatch && actorMatch && ratingMatch;
    });
    setSearchResults(filteredMovies);
  };

  useEffect(handleFilter,[movies, rating, selectedActors, selectedGenres, setSearchResults]);

  return (
    <div className="sidebar">
      <Form>
        <Form.Group controlId="formGenres">
          <Form.Label>Genres</Form.Label>
          {genres.map(genre => (
            <Form.Check 
              key={genre.id} 
              type="checkbox" 
              label={genre.name} 
              value={genre.id} 
              onChange={handleGenreChange} 
            />
          ))}
        </Form.Group>

        <Form.Group controlId="formActors">
          <Form.Label>Actors</Form.Label>
          {actors.map(actor => (
            <Form.Check 
              key={actor.id} 
              type="checkbox" 
              label={actor.name} 
              value={actor.id} 
              onChange={handleActorChange} 
            />
          ))}
        </Form.Group>

        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" value={rating} onChange={handleRatingChange} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Sidebar;
