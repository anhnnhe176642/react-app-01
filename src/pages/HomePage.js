import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import "./HomePage.css";
import Sidebar from "../components/Sidebar";

function HomePage() {
  const { movies, searchResults } = useContext(MovieContext);

  const displayMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <Row>
            {displayMovies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
