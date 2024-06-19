import express from "express"
const router =express.Router();

import listTeacher from './listTeacher.js'
router.use("/list_teacher",listTeacher);

import listTeacherbyId from './listTeacherbyId.js'
router.use("/list_teacher_by_id",listTeacherbyId);

export default router;