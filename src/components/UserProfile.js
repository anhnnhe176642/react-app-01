import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <Link to="/edit-profile">
            <button className="btn btn-primary">Edit Profile</button>
          </Link>
        </div>
      ) : (
        <p>Please login to see your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;
