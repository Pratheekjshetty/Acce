import express from "express";
const app= express();

import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./src/helper/databaseConnection.js";  //Add .js at last
import routes from "./routes.js";
import path from "path";
const __dirname=path.resolve();

const PORT =process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
routes(app)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
routes(app);
connectDB();

// console.log(PORT)
app.listen(PORT,()=>{
    console.log("server listening on port no:",PORT);
});
