import express from "express"
const router =express.Router();

import addStudent from './addStudent.js'
router.use("/add_student",addStudent);

import listStudent from './listStudent.js'
router.use("/list_student",listStudent);

import listStudentbyId from './listStudentbyId.js'
router.use("/list_student_by_id",listStudentbyId);

import list from './list.js'
router.use("/list",list);

import list2 from './list2.js'
router.use("/list2",list2);

export default router;