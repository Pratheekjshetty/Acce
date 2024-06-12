import express from 'express';
import initStudentModel from '../../model/studentModel';
const router =express.Router();
import initTeacherModel from '../../model/teacherModel';
router.post("/",async(req,res)=>{
    try{
        const teacherModel =await initStudentModel();
        const{teacher_name,email,phone,password}=req.body;
    }
    catch(err){
        console.log(err);
    }
})
