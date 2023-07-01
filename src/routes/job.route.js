import express from 'express';
import {
  createJob,
  deleteJob,
  fetchJobById,
  getAllJobs,
  updateJob,
  applyJob,
  shortListApplicant,
} from "../controllers/job.controller";
import authenticated from '../middleware/protection';
import multer from 'multer';


const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("invalid image file!", false);
    }
};
const uploads = multer({ storage, fileFilter });




const router = express.Router();

// router.post('/one', uploads.single("image"), savePrescription);
router.get('/all', getAllJobs);
router.get('/:id', fetchJobById);
router.put('/:id', updateJob);
router.put("/apply/:jobId", authenticated, applyJob);
router.put("/shortlist/:jobId/:applicantId", shortListApplicant);
router.delete('/:id', deleteJob);
router.post("/", createJob);





export default router;