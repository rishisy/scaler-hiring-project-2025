import mongoose from "mongoose";


const connectDB = async() => {
    try {

        const coon = await mongoose.connect("mongodb+srv://codepulsedb:codepulsedb@codepulse.39hny9u.mongodb.net/?retryWrites=true&w=majority&appName=codepulse" );
        console.log("Mongodb is connected");

    } catch (error) {


        console.error(`Error ${error.message}`);
        process.exit(1);
    }

};



export default connectDB;
