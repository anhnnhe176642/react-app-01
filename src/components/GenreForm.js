import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { addGenre, updateGenre, getGenreById } from "../services/api";

const GenreForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState({
    name: "",
  });

  useEffect(() => {
    if (id) {
      const fetchGenre = async () => {
        const response = await getGenreById(id);
        setGenre(response.data);
      };
      fetchGenre();
    }
  }, [id]);

  const handleChange = (e) => {
    setGenre({ ...genre, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateGenre(genre);
    } else {
      await addGenre(genre);
    }
    navigate("/admin/genres");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={genre.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {id ? "Update Genre" : "Add Genre"}
      </Button>
    </Form>
  );
};

export default GenreForm;
