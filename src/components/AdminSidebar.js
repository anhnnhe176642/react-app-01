import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/admin/movies">
        Manage Movies
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/genres">
        Manage Genres
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/actors">
        Manage Actors
      </Nav.Link>
    </Nav>
  );
};

export default AdminSidebar;
