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
    type: Number,
    required: true
  },
  execution_score: {
    type: Number,
    required: true
  },
  viva_score: {
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

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

export default Evaluation;
