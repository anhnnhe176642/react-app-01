import React, { useContext, useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import "./HomePage.css";
import Sidebar from "../components/Sidebar";

function HomePage() {
  const { movies, searchResults } = useContext(MovieContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const displayMovies = searchResults.length > 0 ? searchResults : movies;

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = displayMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(displayMovies.length / itemsPerPage);

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <Row>
            {currentMovies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <Pagination className="mt-4">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
