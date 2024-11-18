import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData,
        { withCredentials: true }
      );
      loginUser();
      navigate("/");
    } catch (err) {
      setError(err.response.data.msg || "Registration failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Register
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
