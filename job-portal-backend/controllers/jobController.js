const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  const { title, description, company, location } = req.body;
  try {
    const newJob = new Job({
      title,
      description,
      company,
      location,
      postedBy: req.user,
    });
    const savedJob = await newJob.save();
    const populatedJob = await savedJob.populate("postedBy", "username email");
    res.status(201).json(populatedJob);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", ["username", "email"])
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateJob = async (req, res) => {
  const { title, description, company, location } = req.body;
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    if (job.postedBy.toString() !== req.user)
      return res.status(401).json({ msg: "Unauthorized" });

    job.title = title || job.title;
    job.description = description || job.description;
    job.company = company || job.company;
    job.location = location || job.location;

    const updatedJob = await job.save();
    const populatedUpdatedJob = await updatedJob.populate(
      "postedBy",
      "username email"
    );
    res.status(201).json(populatedUpdatedJob);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    if (job.postedBy.toString() !== req.user)
      return res.status(401).json({ msg: "Unauthorized" });

    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: "Job removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
