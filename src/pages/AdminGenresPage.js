import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getGenres, deleteGenre } from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

const AdminGenresPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await getGenres();
      setGenres(response.data);
    };
    fetchGenres();
  }, []);

  const handleDelete = async (id) => {
    await deleteGenre(id);
    setGenres(genres.filter((genre) => genre.id !== id));
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container">
        <h2>Manage Genres</h2>
        <Button
          as={Link}
          to="/admin/genres/add"
          variant="primary"
          className="mb-3"
        >
          Add Genre
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.id}</td>
                <td>{genre.name}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/genres/edit/${genre.id}`}
                    variant="warning"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(genre.id)}
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

export default AdminGenresPage;
