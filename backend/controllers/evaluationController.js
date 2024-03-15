import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import { EvaluationRoom , Evaluation } from '../models/evaluationModel.js';
import Mentor from '../models/mentorModel.js';
import { Error } from 'mongoose';








const createEvaluationRoom = asyncHandler(async (req, res) => {
    try {
        const mentor = req.body.mentor;
        // check if mentor already has a room if yes dont let him create new room
        const room = await EvaluationRoom.findOne({ mentor  });
        if (room !== null) {
            res.status(400);
            throw new Error('Evaluation Room already exists');
        }
        const evaluationRoom = new EvaluationRoom({
            mentor,
            is_open: true
        });
        await evaluationRoom.save();
        res.status(201).json(evaluationRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating evaluation room' });
    }

 });

const getEvaluationRoom = asyncHandler(async (req, res) => {
    try {
        const mentor = req.mentor;
        const evaluationRoom = await EvaluationRoom.findOne({ mentor    });
        if ( evaluationRoom === null) {
            res.status(404);
            res.status(500).json({ message: 'No Evaluation Room' });
        }
        res.status(200).json(evaluationRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching evaluation room' });
    }
});

const addStudentToEvaluationRoom = asyncHandler(async (req, res) => {
    try {
        const { student_id } = req.body;
        // only for current scaler project
        const mentor = req.body.mentor;
        const evaluationRoom = await EvaluationRoom.findOne({ mentor    });
        if ( evaluationRoom === null) {
            res.status(404);
            res.status(500).json({ message: 'No Evaluation Room' });
        }
        // check if student is set to not evaluated
        const student = await Student.findById(student_id);
        if (student.evaluation_status === 'evaluated') {
            res.status(400);
            throw new Error('Student already evaluated');
        }
        const evaluation = new Evaluation({
            evaluation_room: evaluationRoom._id,
            mentor: mentor,
            student: student_id
        });
        await evaluation.save();
        student.evaluation_status = 'inprogress';
        student.assigned_mentor = mentor;
        await student.save();
        res.status(201).json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding student to evaluation room' });
    }
});

const deleteStudentFromEvaluationRoom = asyncHandler(async (req, res) => {
    try {
        const { student_id } = req.body;
        const mentor = req.user._id;
        const evaluationRoom = await EvaluationRoom.findOne({ mentor    });
        if ( evaluationRoom === null) {
            res.status(404);
            res.status(500).json({ message: 'No Evaluation Room' });
        }
        // check if student is set to not evaluated
        const student = await Student.findById(student_id);
        if (student.evaluation_status === 'not_evaluated') {
            res.status(400);
            throw new Error('Student not evaluated');
        }
        const evaluation = await Evaluation.findOne({ student_id: student_id });
        await evaluation.delete();
        student.evaluation_status = 'not_evaluated';
        student.assigned_mentor = null;
        await student.save();
        res.status(201).json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting student from evaluation room' });
    }
});

const setStudentEvaluationScore = asyncHandler(async (req, res) => {
    try {
        const { student_id, ideation_score, execution_score, viva_score } = req.body;
        const mentor = req.body.mentor;

        const evaluationRoom = await EvaluationRoom.findOne({ mentor    });
        if ( evaluationRoom === null) {
            res.status(404);
            res.status(500).json({ message: 'No Evaluation Room' });
        }
        // check if student is set to not evaluated
        const student = await Student.findById(student_id);
        console.log(student);
        if (student.evaluation_status === 'evaluated') {
            res.status(400);
            throw new Error('Student already evaluated');
        }
        // creating evaluation for student
        const evaluation = new Evaluation({
            evaluation_room: evaluationRoom._id,
            mentor: mentor,
            student: student_id
        });

        evaluation.ideation_score = ideation_score;
        evaluation.execution_score = execution_score;
        evaluation.viva_score = viva_score;
        evaluation.total_score = ideation_score + execution_score + viva_score;
        await evaluation.save();
        res.status(200).json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error setting student evaluation score' });
    }
}
);

const finaliseEvaluation = asyncHandler(async (req, res) => {
    try {
        const mentor = req.body.mentor;
        const evaluationRoom = await EvaluationRoom.findOne({ mentor    });
        if ( evaluationRoom === null) {
            res.status(404);
            res.status(500).json({ message: 'No Evaluation Room' });
        }
        const allEvaluations = await Evaluation.find({ mentor    });
        for (const evaluation of allEvaluations) {
            evaluation.is_finalized = true;

            // and also set all student marks status to not_evaluated
            const student = await Student.findById(evaluation.student);
            student.evaluation_status = 'evaluated';
            await student.save();

            await evaluation.save();

        }
        // also close and delete eval room and detach from mentor
        evaluationRoom.is_open = false;
        await evaluationRoom.deleteOne();
        res.status(201).json({ message: 'Evaluation finalised' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error finalising evaluation' });
    }
}
);









export {    createEvaluationRoom, getEvaluationRoom, addStudentToEvaluationRoom  , deleteStudentFromEvaluationRoom , setStudentEvaluationScore , finaliseEvaluation} ;







