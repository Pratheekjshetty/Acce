import express from "express";
const app= express();

import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./src/helper/databaseConnection.js";  //Add .js at last

const PORT =process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();
app.listen(PORT,()=>{
    console.log("server listening on port no:",PORT);
});
