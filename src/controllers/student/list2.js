import express from 'express';
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";

const router = express.Router();

router.get("/:id?", authenticate, async (req, res) => {
    try {
        const studentModel = await initStudentModel();
        const teacher_id = req.user.id;
        const student_id = req.params.id;
        const query = {
            is_Active: constants.STATE.ACTIVE,
            teacher_id: teacher_id,
            ...(student_id && { _id: student_id })
        };
        
        const data = student_id ? await studentModel.findOne(query) : await studentModel.find(query);
        
        if (data) {
            const responseData = student_id ? {
                _id: data._id,
                student_name: data.student_name,
                rollno: data.rollno,
                image: data.image.map(img => "/uploads/" + img)
            } : data.map(item => ({
                _id: item._id,
                student_name: item.student_name,
                rollno: item.rollno,
                image: item.image.map(img => "/uploads/" + img)
            }));
            
            return res.json({
                code: RESPONSE.SUCCESS.code,
                message: "students " + RESPONSE.SUCCESS.message,
                data: responseData,
            });
        } else {
            return res.json({
                code: RESPONSE.NOT_FOUND.code,
                message: "students " + RESPONSE.NOT_FOUND.message,
            });
        }
    } catch (err) {
        console.log("liststudent", err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
});

export default router;
