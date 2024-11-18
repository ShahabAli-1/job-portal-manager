// src/components/Jobs/EditJobModal.jsx
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
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

const EditJobModal = ({ open, handleClose, job, setJobs }) => {
  const [formData, setFormData] = useState({
    title: job.title,
    description: job.description,
    company: job.company,
    location: job.location,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/jobs/${job._id}`,
        formData,
        { withCredentials: true }
      );
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j._id === job._id ? res.data : j))
      );
      handleClose();
      setError("");
    } catch (err) {
      setError(err.response.data.msg || "Failed to update job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-job-modal"
      aria-describedby="modal-for-editing-job"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography
          id="edit-job-modal"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Edit Job
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
          disabled={submitting}
        >
          {submitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update Job"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditJobModal;
