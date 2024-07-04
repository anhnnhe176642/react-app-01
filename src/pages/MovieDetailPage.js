import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const { genres } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchActors = async () => {
      try {
        const response = await axios.get('http://localhost:9999/actors');
        setActors(response.data);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchMovie();
    fetchActors();
  }, [id]);

  useEffect(() => {
    if (movie) {
      const fetchRelatedMovies = async () => {
        try {
          const response = await axios.get('http://localhost:9999/movies');
          const allMovies = response.data;
          const related = allMovies.filter(m => 
            m.genreId === movie.genreId || movie.actors.some(actorId => m.actors.includes(actorId))
          );
          setRelatedMovies(related);
        } catch (error) {
          console.error('Error fetching related movies:', error);
        }
      };

      fetchRelatedMovies();
    }
  }, [movie]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const genre = genres.find(g => g.id === movie.genreId);

  return (
    <div className="container mt-4">
      <Row>
        <Col md={4}>
          <img src={movie.imgUrl} alt={movie.title} className="img-fluid" />
        </Col>
        <Col md={8}>
          <h2>{movie.title}</h2>
          <p><strong>Genre:</strong> {genre ? genre.name : 'Unknown'}</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
        </Col>
      </Row>
      <h3 className="mt-4">Actors</h3>
      <Row>
        {movie.actors.map(actorId => {
          const actor = actors.find(a => a.id === actorId);
          return actor ? (
            <Col md={3} key={actor.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={actor.profilePictureUrl} />
                <Card.Body>
                  <Card.Title>{actor.name}</Card.Title>
                  <Card.Text>{actor.biography}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : null;
        })}
      </Row>
      <h3 className="mt-4">Related Movies</h3>
      <Row>
        {relatedMovies.map(relatedMovie => (
          <Col md={3} key={relatedMovie.id} className="mb-4">
            <MovieCard movie={relatedMovie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MovieDetailPage;
