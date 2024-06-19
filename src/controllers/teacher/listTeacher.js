import express from 'express';
const router =express.Router()
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initTeacherModel from "../../model/teacherModel.js";
router.get("/",async(req,res)=>{
    try{
        const teacherModel=await initTeacherModel();
        let response;
        let data=await teacherModel.find({    //in array format
            is_Active:constants.STATE.ACTIVE,
            // teacher_id:teacher_id,
        });

        if(data.length==0){
            response=RESPONSE.NOT_FOUND;
            return res.json({
                code:response.code,
                message:"teachers "+response.message,
            });
        }
        else{ 
            data=data.map((item)=>{
                return{
                    _id:item._id,
                    teacher_name:item.teacher_name,
                    email:item.email,
                    phone:item.phone,
                    password:item.password,
                }
            })
            response=RESPONSE.SUCCESS;
            return res.json({ 
                code:response.code,
                message:"teachers "+response.message,
                data:data,
            });
        }
    }
    catch(err){
        console.log("listteacher",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
})

export default router;