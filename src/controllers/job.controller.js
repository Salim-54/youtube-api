import {
  handleGetSingle,
  handleDelete,
  handleCreateUser,
  handleUpdate,
  handleCreate,
} from "../helper/general.helper.js";
import Job from "../database/model/job.model.js";
import Category from "../database/model/category.model.js";
import User from "../database/model/auth.model.js";
import { shortListMail } from "../utils/mailer.js";

const createJob = async (req, res) => {
  try {
    const { title, category, company, degree, description, deadLine, post } =
      req.body;
    const data = {
      title,
      category,
      company,
      degree,
      description,
      deadLine,
      post,
    };

    const catExist = await Category.findById(category);
    if (!catExist) {
      return res.status(400).json({
        status: "Fail",
        message: `Ooooops! the job category does not exist in our system!!`,
      });
    }

    const newJob = await Job.create(data);
    catExist.jobs.push(newJob._id);

    await catExist.save(function (error) {
      res.status(201).json({ data: newJob });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Fail", message: "Something went wrong!!" });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, company, degree, description, deadLine, post } = req.body;
  const data = {
    title,

    company,
    degree,
    description,
    deadLine,
    post,
  };
  try {
    const jobExist = await Job.findById(id);
    if (!jobExist) {
      return res.status(400).json({
        status: "Fail",
        message: `Ooooops! the job does not exist in our system!!`,
      });
    }

    const updatedJob = await handleUpdate(Job, id, data, res);

    updatedJob
      ? res.status(201).json({
          message: "Job has been updated successfully",
          data: updatedJob,
        })
      : res.status(500).json({ message: "Internal server error!" });
  } catch (error) {
    return res.status(500).json({ message: "ooops! something went wrong!" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .sort({ name: 1 })
      .populate("category", "-_id -__v -createdAt -updatedAt -jobs");

    jobs
      ? res.status(200).json(jobs)
      : res.status(500).json({ message: "Internal server error" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const applyJob = async (req, res) => {
  const id = req.user._id;
  const { jobId } = req.params;
  try {
    const applicant = await User.findById(id);
    const job = await Job.findById(jobId);

    if (job && applicant) {
      const foundShortList = applicant.applications.includes(jobId);

      if (foundShortList) {
        return res
          .status(400)
          .json({ message: "You have already applied for this job!" });
      }

      job.applicants.push(applicant._id);
      await job.save();

      await applicant.applications.push(job._id);
      await applicant.save();

      return res.status(200).json(job);
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate(
      "category applicants shortLists",
      " -__v -createdAt -updatedAt -jobs"
    );

    job
      ? res.status(200).json(job)
      : res.status(500).json({ message: "Job doesn't exist!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);

    if (job) {
      await Job.findByIdAndDelete(id);
      return res
        .status(304)
        .json({ message: "Job has been deleted successfully!" });
    } else {
      res.status(404).json({ message: "Job doesn't exist!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const shortListApplicant = async (req, res) => {
  // const id = req.user._id;
  const { jobId } = req.params;
  const { applicantId } = req.params;
  try {
    const applicant = await User.findById(applicantId);
    const job = await Job.findById(jobId);

    if (job && applicant) {
      const foundShortList = applicant.shortlists.includes(jobId);
      const hasApplied = job.applicants.includes(applicantId);

      if (foundShortList) {
        return res
          .status(400)
          .json({ message: "The applicant is already shortlisted" });
      }
      if (!hasApplied) {
        return res
          .status(400)
          .json({ message: "The applicant has not even applied for the job" });
      }

      job.shortLists.push(applicant);
      await job.save();

      applicant.shortlists.push(job);
      await applicant.save();

      await shortListMail(
        applicant.email,
        job.company,
        job.title,
        applicant.firstName
      );

      return res.status(200).json(job);
    } else {
      return res.status(400).json({ message: "The  job id is invalid" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createJob,
  updateJob,
  deleteJob,
  fetchJobById,
  getAllJobs,
  applyJob,
  shortListApplicant,
};