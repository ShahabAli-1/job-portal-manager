const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const auth = require("../middleware/auth");

// Create a Job
router.post("/", auth, jobController.createJob);

// Get All Jobs
router.get("/", auth, jobController.getJobs);

// Update a Job
router.put("/:id", auth, jobController.updateJob);

// Delete a Job
router.delete("/:id", auth, jobController.deleteJob);

module.exports = router;
