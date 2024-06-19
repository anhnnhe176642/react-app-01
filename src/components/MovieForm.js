import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGenres,
  addMovie,
  updateMovie,
  getMovieById,
} from "../services/api";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    imgUrl: "",
    actors: "",
    genre: "",
    rating: "",
  });
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await getGenres();
      setGenres(response.data);
    };
    fetchGenres();

    if (id) {
      const fetchMovie = async () => {
        const response = await getMovieById(id);
        setMovie(response.data);
      };
      fetchMovie();
    }
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateMovie(movie);
    } else {
      await addMovie(movie);
    }
    navigate("/admin/movies");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={movie.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formImgUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="imgUrl"
          value={movie.imgUrl}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formActors">
        <Form.Label>Actors</Form.Label>
        <Form.Control
          type="text"
          name="actors"
          value={movie.actors}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formGenre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          as="select"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          required
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          name="rating"
          value={movie.rating}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {id ? "Update Movie" : "Add Movie"}
      </Button>
    </Form>
  );
};

export default MovieForm;
