import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import JobCard from "./JobCard";
import Header from "../Layout/Header";
import { AuthContext } from "../../context/AuthContext";
import CreateJobModal from "./CreateJobModa";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`, {
        withCredentials: true,
      });
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredJobs =
    tabValue === 0
      ? jobs
      : jobs.filter((job) => user && job.postedBy._id === user.id);

  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Jobs" />
          <Tab label="My Jobs" />
        </Tabs>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Create Job
        </Button>
      </Box>
      <CreateJobModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        fetchJobs={fetchJobs}
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredJobs.length === 0 ? (
        <Typography>No jobs available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job._id}>
              <JobCard job={job} setJobs={setJobs} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default JobList;
