import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getActors, deleteActor } from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

const AdminActorsPage = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      const response = await getActors();
      setActors(response.data);
    };
    fetchActors();
  }, []);

  const handleDelete = async (id) => {
    await deleteActor(id);
    setActors(actors.filter((actor) => actor.id !== id));
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container">
        <h2>Manage Actors</h2>
        <Button
          as={Link}
          to="/admin/actors/add"
          variant="primary"
          className="mb-3"
        >
          Add Actor
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Biography</th>
              <th>Profile Picture URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor) => (
              <tr key={actor.id}>
                <td>{actor.id}</td>
                <td>{actor.name}</td>
                <td>{actor.dateOfBirth}</td>
                <td>{actor.biography}</td>
                <td>{actor.profilePictureUrl}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/actors/edit/${actor.id}`}
                    variant="warning"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(actor.id)}
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

export default AdminActorsPage;
