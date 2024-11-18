import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateJobModal = ({ open, handleClose, fetchJobs }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, formData, {
        withCredentials: true,
      });
      fetchJobs();
      handleClose();
      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
      });
      setError("");
    } catch (err) {
      setError(err.response.data.msg || "Failed to create job");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-job-modal"
      aria-describedby="modal-for-creating-job"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography
          id="create-job-modal"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Create Job
        </Typography>
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <TextField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateJobModal;
