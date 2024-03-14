import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import Evaluation from '../models/evaluationModel.js';

import { Error } from 'mongoose';


const getStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find({});

        for (const student of students){

            if  (student.evaluated_status === 'evaluated') {

                const evaluation = await Evaluation.findOne({ student_id: student._id });
                student.evaluation = evaluation;
            }

        }

        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching students' });
    }
});


export { getStudents };
















const getProjects = asyncHandler(async (req, res) => {
  try {
    // Get the logged-in user's ID from authentication (replace with your logic)
    const userId = req.user._id/* replace with logic to retrieve logged-in user's ID */;

    // Filter projects based on user ID (owner or team member)
    const projects = await Project.find({
      $or: [{ owner: userId }, { teamMembers: { $in: [userId] } }],
    });

    if (!projects.length) {
      return res.status(200).json({ message: 'No projects found for this user' }); // Adjusted status code to 200
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});




export { createProject , getProjects };
