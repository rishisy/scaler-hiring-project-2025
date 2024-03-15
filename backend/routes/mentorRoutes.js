import  express from 'express';
const router = express.Router();
import { getStudents } from '../controllers/mentorController.js';
import { batchCreateStudents , batchCreateMentors } from '../controllers/mentorController.js';
// /api/students
router.get('/' , getStudents);
router.get('/batchCreateStudents' , batchCreateStudents);
router.get('/batchCreateMentors' , batchCreateMentors);


export default router;
