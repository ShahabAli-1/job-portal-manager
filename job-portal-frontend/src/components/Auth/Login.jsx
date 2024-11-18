// src/components/Auth/Login.jsx
import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
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
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData, {
        withCredentials: true,
      });
      loginUser();
      navigate("/");
    } catch (err) {
      setError(err.response.data.msg || "Login failed");
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
        Login
      </Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
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
        Login
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link component={RouterLink} to="/register">
          Register
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
