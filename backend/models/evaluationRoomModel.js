import mongoose from "mongoose";


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


const EvaluationRoom = mongoose.model('EvaluationRoom', evaluationRoomSchema);

export default EvaluationRoom;
// Path: evaluationRoomModel.js
