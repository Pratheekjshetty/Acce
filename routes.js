import express from "express"
import authApiHandler from "./src/controllers/auth/apiHandler.js"
import studentApiHandler from "./src/controllers/student/apiHandler1.js"
import teacherApiHandler from "./src/controllers/teacher/apiHandler2.js"

const routes=(app)=>{
    app.use(express.json());
    app.use("/api/auth",authApiHandler);
    app.use("/api/student",studentApiHandler);
    app.use("/api/teacher",teacherApiHandler);

};

export default routes;