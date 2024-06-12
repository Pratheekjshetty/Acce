import mongoose, { Schema } from "mongoose";
const studentModel={
    student_name:{
        type:String,
        required:true,
    },
    rollno:{
        type:String,
        required:true,
    },
    image:{
        type:[String],
        data:buffer,
        required:true,
    },
    teacher_id:{
        type:Schema.Types.ObjectId,
        ref:"teacherdata",
    },
    is_Active:{
        type:String,
        default:1,
    },
}
let student =null;

const initStudentModel=async()=>{
    try{
        student=mongoose.model("studentmodel",studentModel); //studentmodel table is created in database
        return student;
    }
    catch(err){
        console.log(err);
        console.log("student_model",err)
    }
}
export default initStudentModel; //if multiple function call it inside {}