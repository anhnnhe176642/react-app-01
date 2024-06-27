import React, { useContext } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import './HomePage.css';

function HomePage() {
  const { movies, searchResults } = useContext(MovieContext);

  const displayMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <Container>
      <Row>
        {displayMovies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
