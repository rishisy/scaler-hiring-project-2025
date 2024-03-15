import  express from 'express';
const router = express.Router();
import {   createEvaluationRoom, getEvaluationRoom, addStudentToEvaluationRoom  , deleteStudentFromEvaluationRoom , setStudentEvaluationScore , finaliseEvaluation } from '../controllers/evaluationController.js';
// /api/evaluation
router.get('/' , getEvaluationRoom);
router.post('/' , createEvaluationRoom);
router.post('/student' , addStudentToEvaluationRoom);
router.put('/student' , setStudentEvaluationScore);
router.delete('/student' , deleteStudentFromEvaluationRoom);
router.put('/' , finaliseEvaluation);



export default router;
