import mongoose from "mongoose";


const connectDB = async() => {
    try {

        const coon = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb is connected");

    } catch (error) {


        console.error(`Error ${error.message}`);
        process.exit(1);
    }

};



export default connectDB;
