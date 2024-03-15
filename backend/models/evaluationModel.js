import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
  evaluation_room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EvaluationRoom',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
  },
  ideation_score: {
    default: 0,
    type: Number,
    required: true
  },
  execution_score: {
    default: 0,
    type: Number,
    required: true
  },
  viva_score: {
    default: 0,
    type: Number,
    required: true
  },
  is_finalized: {
    type: Boolean,
    default: false
  },
  total_score: {
    type: Number,
    default: 0
  }
});


const evaluationRoomSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  is_open: {
    type: Boolean,
    default:false
  }
});


const Evaluation = mongoose.model('Evaluation', evaluationSchema);
const EvaluationRoom = mongoose.model('EvaluationRoom', evaluationRoomSchema);




export { Evaluation, EvaluationRoom };


