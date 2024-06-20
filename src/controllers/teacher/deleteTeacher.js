import express from 'express';
const router =express.Router()
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initTeacherModel from "../../model/teacherModel.js";
router.put("/:id",async(req,res)=>{
    try{
        const teacherModel=await initTeacherModel();
        let response;
        const teacher_id=req.params.id;
        
    const isValidId = await teacherModel.findOne({
        _id:teacher_id,
        is_Active:constants.STATE.ACTIVE,
    }
    );
    if(!isValidId){
        response=RESPONSE.INVALID_DATA;
        return res.json({
            code:response.code,
            message:"ID "+response.message
        });
    }
    await teacherModel.findOneAndUpdate(
        {
            _id:teacher_id,
            is_Active:constants.STATE.ACTIVE,
        },
        {is_Active:constants.STATE.INACTIVE}
    );
    return res.json(RESPONSE.SUCCESS);
    }
    catch(err){
        console.log("deleteteacher",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
})

export default router;