import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import Mentor from '../models/mentorModel.js';
import { Error } from 'mongoose';


const getStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching students' });
    }
});

// get route to make fake dummy students for this scaler project  this is not used in production
const batchCreateStudents = asyncHandler(async (req, res) => {

    try {
        // display amount of fake dummy students to batchCreateStudents
        const amount = req.query.amount;

        if (!amount) {
            res.status(400);
            throw new Error('Amount is required');
        }

        console.log(amount);


        for (let i = 1; i < amount; i++) {
            const student = new Student({
                name: `student${i}`,
                email: `mymail${i}@gmail.com`,
                registration_number: i + 1000,
                assigned_mentor: null,
                evaluation_status: 'not_evaluated'
            });
            await student.save();
        }
        res.status(201).json({ message: 'Students created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating students' });
    }

}
);


const batchCreateMentors = asyncHandler(async (req, res) => {

    try {
        // display amount of fake dummy students to batchCreateStudents
        const amount = req.query.amount;

        if (!amount) {
            res.status(400);
            throw new Error('Amount is required');
        }

        console.log(amount);

        for (let i = 1; i < amount; i++) {
            const mentor = new Mentor({
                name: `mentor${i}`,
                email: `mymentormail${i}@gmail.com`,
                registration_number: i + 1000,
            });
            await mentor.save();
        }
        res.status(201).json({ message: 'Mentors created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating mentors' });
    }

}
);



export { getStudents , batchCreateStudents , batchCreateMentors } ;












