// Description: Mentor model schema for the application.
import mongoose from "mongoose";


const mentorSchema  = mongoose.Schema({

    name:{
        type:String,
        required:true ,
        minlength:3
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
       // minlength:6
    },
    projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
              }],
},


    { timestamps:true }


);

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;
