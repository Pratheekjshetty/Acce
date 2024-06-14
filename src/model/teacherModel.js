import mongoose from "mongoose";
const teacherModel={
    teacher_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    is_Active:{
        type:String,
        default:1,
    },
}
let teacher =null;

const initTeacherModel=async()=>{
    try{
        if(teacher)return teacher;
        teacher=mongoose.model("teachermodel",teacherModel); //teachermodel table is created in database
        return teacher;
    }
    catch(err){
        console.log(err);
        console.log("teacher_model",err)
    }
}
export default initTeacherModel; //if multiple function call it inside {}