import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";
import { updateUser, getUserByUsername } from "../services/api";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const response = await getUserByUsername(user.username);
      if (response.data.length > 0) {
        setUserId(response.data[0].id);
      }
    };
    fetchUserId();
  }, [user.username]);

  const validate = async () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name cannot be empty";

    if (currentPassword && currentPassword !== user.password) {
      newErrors.currentPassword = "Current password is incorrect";
    }

    if (currentPassword && (newPassword === null || newPassword === "")) {
      newErrors.newPassword = "New password is required";
    }

    if (username !== user.username) {
      const response = await getUserByUsername(username);
      if (response.data.length > 0) {
        newErrors.username = "Username is already taken";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (await validate()) {
      const updatedUser = {
        id: userId,
        username,
        name,
        password: newPassword || user.password,
        role: user.role,
      };
      const response = await updateUser(updatedUser);
      if (response) {
        setUser(updatedUser);
        alert("Profile updated successfully");
        navigate("/profile");
      } else {
        alert("Error updating profile");
      }
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
            required
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCurrentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            isInvalid={!!errors.currentPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.currentPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isInvalid={!!errors.newPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
