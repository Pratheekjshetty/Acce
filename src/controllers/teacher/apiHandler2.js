import express from "express"
const router =express.Router();

import listTeacher from './listTeacher.js'
router.use("/list_teacher",listTeacher);

import listTeacherbyId from './listTeacherbyId.js'
router.use("/list_teacher_by_id",listTeacherbyId);

import editTeacher from './editTeacher.js'
router.use("/edit_teacher",editTeacher);

import deleteTeacher from './deleteTeacher.js'
router.use("/delete_teacher",deleteTeacher);

import searchTeacher from './searchTeacher.js'
router.use("/search_teacher",searchTeacher);

export default router;