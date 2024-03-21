import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import {notFound , errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoutes from './routes/mentorRoutes.js';
import evaluationRoutes from './routes/evaluationRoutes.js';
dotenv.config() ;

const port = process.env.PORT || 4040;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(errorHandler);
app.use('/api/students' , studentRoutes );
app.use('/api/eval' , evaluationRoutes );


app.get('/' , (req,res) => res.send('Server is Ready now'));

// we keep this in last so if no url matches it will show no found
app.use(notFound);


app.listen(port , () => console.log(`Server started on port ${port}`));



