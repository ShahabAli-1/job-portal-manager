// src/components/Jobs/JobCard.jsx
import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import EditJobModal from "./EditJobModal";
import ConfirmDialog from "../../utils/ConfirmDialog";
const JobCard = ({ job, setJobs }) => {
  const { user } = useContext(AuthContext);
  const isOwner = user && user.id === job.postedBy._id;
  const [expanded, setExpanded] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false); // State for ConfirmDialog

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${job._id}`, {
        withCredentials: true,
      });
      setJobs((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
    } catch (err) {
      console.error(err);
    }
    setDeleting(false);
    setOpenConfirm(false);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleExpand}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          mb: 2,
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="job-content"
          id="job-header"
          sx={{
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {job.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created by {job.postedBy.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          {isOwner && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Accordion toggle
                  setOpenEditModal(true);
                }}
                disabled={deleting}
                aria-label="edit job"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Accordion toggle
                  setOpenConfirm(true); // Open the confirmation dialog
                }}
                disabled={deleting}
                aria-label="delete job"
              >
                {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
              </IconButton>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <BusinessIcon color="action" sx={{ mr: 1 }} />
            <Typography variant="body1">
              <strong>Company:</strong> {job.company}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOnIcon color="action" sx={{ mr: 1 }} />
            <Typography variant="body1">
              <strong>Location:</strong> {job.location}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DescriptionIcon color="action" sx={{ mr: 1 }} />
            <Typography variant="body1">
              <strong>Description:</strong> {job.description}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      {isOwner && (
        <>
          <EditJobModal
            open={openEditModal}
            handleClose={() => setOpenEditModal(false)}
            job={job}
            setJobs={setJobs}
          />
          <ConfirmDialog
            open={openConfirm}
            title="Delete Job"
            description="Are you sure you want to delete this job? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setOpenConfirm(false)}
          />
        </>
      )}
    </>
  );
};

export default JobCard;
