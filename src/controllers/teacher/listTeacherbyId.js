import express from 'express';
const router =express.Router()
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initTeacherModel from "../../model/teacherModel.js";
router.get("/:id",async(req,res)=>{
    try{
        const teacherModel=await initTeacherModel();
        let response;
        const teacher_id=req.params.id;

        let data=await teacherModel.findOne({     //in json format
            is_Active:constants.STATE.ACTIVE,
            _id:teacher_id,
        });
        if(data){
            // data=data.map((item)=>{
            //     return{
            //         _id:item._id,
            //         teacher_name:item.teacher_name,
            //         email:item.email,
            //         phone:item.phone,
            //         password:item.password,
            //     }
            // })
            data={
                _id:data._id,
                teacher_name:data.teacher_name,
                email:data.email,
                phone:data.phone,
                password:data.password,
            }
            response=RESPONSE.SUCCESS;
            return res.json({ 
                code:response.code,
                message:"teachers "+response.message,
                data:data,
            });  
        }
        else{ 
            response=RESPONSE.NOT_FOUND;
            return res.json({
                code:response.code,
                message:"teachers "+response.message,
            });
        }
    }
    catch(err){
        console.log("listteacher",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
})

export default router;