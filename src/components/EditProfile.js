import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";
import { updateUser } from "../services/api";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      username,
      name,
      password: newPassword || password,
    };
    const response = await updateUser(updatedUser);
    if (response) {
      setUser(updatedUser);
      alert("Profile updated successfully");
    } else {
      alert("Error updating profile");
    }
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
