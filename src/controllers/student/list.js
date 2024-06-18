//both list all and list by id
import express from 'express';
const router =express.Router()
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";
router.get("/:id?",authenticate,async(req,res)=>{
    try{
        const studentModel=await initStudentModel();
        const teacher_id= req.user.id;
        let data;
        let response;
        const student_id=req.params.id;
        if(student_id){
            data=await studentModel.findOne({     //in json format
                is_Active:constants.STATE.ACTIVE,
                teacher_id:teacher_id,
                _id:student_id,
            });
            if(data){
                data={
                    _id:data._id,
                    student_name:data.student_name,
                    rollno:data.rollno,
                    image:data.image.map((img)=>"/uploads/"+img),
                }
                response=RESPONSE.SUCCESS;
                return res.json({ 
                    code:response.code,
                    message:"students "+response.message,
                    data:data,
                });  
            }
            else{ 
                response=RESPONSE.NOT_FOUND;
                return res.json({
                    code:response.code,
                    message:"students "+response.message,
                });
            }
        }else{
            data=await studentModel.find({    //in array format
                is_Active:constants.STATE.ACTIVE,
                teacher_id:teacher_id,
            });
            if(data.length==0){
                response=RESPONSE.NOT_FOUND;
                return res.json({
                    code:response.code,
                    message:"students "+response.message,
                });
            }
            else{ 
                data=data.map((item)=>{
                    return{
                        _id:item._id,
                        student_name:item.student_name,
                        rollno:item.rollno,
                        image:item.image.map((img)=>"/uploads/"+img), //to upload image
                    }
                })
                response=RESPONSE.SUCCESS;
                return res.json({ 
                    code:response.code,
                    message:"students "+response.message,
                    data:data,
                });
            }
        }  
    }
    catch(err){
        console.log("liststudent",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
})
export default router;