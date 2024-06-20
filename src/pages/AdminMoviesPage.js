import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMovies, getActors, deleteMovie } from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      setMovies(response.data);
    };

    const fetchActors = async () => {
      const response = await getActors();
      setActors(response.data);
    };

    fetchMovies();
    fetchActors();
  }, []);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const getActorNames = (actorIds) => {
    return actorIds
      .map((id) => {
        const actor = actors.find((actor) => actor.id === id);
        return actor ? actor.name : "Unknown";
      })
      .join(", ");
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container">
        <h2>Manage Movies</h2>
        <Button
          as={Link}
          to="/admin/movies/add"
          variant="primary"
          className="mb-3"
        >
          Add Movie
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image URL</th>
              <th>Actors</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.imgUrl}</td>
                <td>{getActorNames(movie.actors)}</td>
                <td>{movie.genre}</td>
                <td>{movie.rating}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/movies/edit/${movie.id}`}
                    variant="warning"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminMoviesPage;
