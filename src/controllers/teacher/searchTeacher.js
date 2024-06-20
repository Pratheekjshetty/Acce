import express from 'express';
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initTeacherModel from "../../model/teacherModel.js";

router.get("/:search_key",async (req, res) => {
  try {
    let search_key = req.params.search_key;
    const teacherModel = await initTeacherModel();
    let response;

    let data = await teacherModel.find({
      is_Active: constants.STATE.ACTIVE,
      $or: [
        { teacher_name: { $regex: search_key, $options: "i" } },
        { phone: { $regex: search_key } },
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
            _id:item._id,
            teacher_name:item.teacher_name,
            email:item.email,
            phone:item.phone,
            password:item.password,
        };
      });
      response = RESPONSE.SUCCESS;
      return res.json({
        code: response.code,
        msg: "teachers " + response.message,
        data: data,
      });
    }
  } catch (err) {
    console.log("searchTeacher", err);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;