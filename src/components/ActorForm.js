import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { addActor, updateActor, getActorById } from "../services/api";

const ActorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState({
    name: "",
    dateOfBirth: "",
    biography: "",
    profilePictureUrl: "",
  });

  useEffect(() => {
    if (id) {
      const fetchActor = async () => {
        const response = await getActorById(id);
        setActor(response.data);
      };
      fetchActor();
    }
  }, [id]);

  const handleChange = (e) => {
    setActor({ ...actor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateActor(actor);
    } else {
      await addActor(actor);
    }
    navigate("/admin/actors");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={actor.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={actor.dateOfBirth}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBiography">
        <Form.Label>Biography</Form.Label>
        <Form.Control
          as="textarea"
          name="biography"
          value={actor.biography}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formProfilePictureUrl">
        <Form.Label>Profile Picture URL</Form.Label>
        <Form.Control
          type="text"
          name="profilePictureUrl"
          value={actor.profilePictureUrl}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {id ? "Update Actor" : "Add Actor"}
      </Button>
    </Form>
  );
};

export default ActorForm;
