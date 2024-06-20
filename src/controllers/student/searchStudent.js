import express from 'express';
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";

router.get("/", authenticate, async (req, res) => {
    try {
        const studentModel = await initStudentModel();
        const teacher_id = req.user.id;
          // Get the 'name' query parameter from the request
        let response;
        let query = {
            is_Active: constants.STATE.ACTIVE,
            teacher_id: teacher_id
        };
        const studentName = req.query.name;
        if (studentName) {
            query.student_name = { $regex: new RegExp(studentName, 'i') }; // Case-insensitive search
        }

        let data = await studentModel.find(query);

        if (data.length === 0) {
            response = RESPONSE.NOT_FOUND;
            return res.json({
                code: response.code,
                message: "students " + response.message,
            });
        } else {
            data = data.map((item) => ({
                _id: item._id,
                student_name: item.student_name,
                rollno: item.rollno,
                image: item.image.map(img => "/uploads/" + img), // to upload image
            }));

            response = RESPONSE.SUCCESS;
            return res.json({
                code: response.code,
                message: "students " + response.message,
                data: data,
            });
        }
    } catch (err) {
        console.log("searchstudent", err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
});

export default router;
