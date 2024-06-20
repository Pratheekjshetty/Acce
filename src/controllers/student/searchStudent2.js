import express from 'express';
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";

router.get("/:search_key", authenticate, async (req, res) => {
  try {
    let search_key = req.params.search_key;
    const studentModel = await initStudentModel();
    const teacher_id = req.user.id;
    let response;

    let data = await studentModel.find({
      is_Active: constants.STATE.ACTIVE,
      teacher_id: teacher_id,
      $or: [
        { student_name: { $regex: search_key, $options: "i" } },
        { rollno: { $regex: search_key } },
      ],
    });
    if (data.length == 0) {
      response = RESPONSE.NOT_FOUND;
      return res.json({
        code: response.code,
        message: "data" + response.msg,
      });
    } else {
      data = data.map((item) => {
        return {
          _id: item._id,
          student_name: item.student_name,
          rollno: item.rollno,
          image: item.image.map((img) => "/uploads/" + img),
        };
      });
      response = RESPONSE.SUCCESS;
      return res.json({
        code: response.code,
        msg: "students " + response.msg,
        data: data,
      });
    }
  } catch (err) {
    console.log("searchStudent", err);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;