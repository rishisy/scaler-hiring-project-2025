import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true ,
        minlength:3
    },
    email:{
        type:String,
    },
    password:{
        type:String,
       // minlength:6
    },
  registration_number: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20
  },
  assigned_mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  evaluation_status: {
    type: String,
    enum: ['not_evaluated', 'inprogress', 'evaluated'],
    default: 'not_evaluated'
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
