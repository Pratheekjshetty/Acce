import express from "express"
const router =express.Router();

import addStudent from './addStudent.js'
router.use("/add_student",addStudent);

import listStudent from './listStudent.js'
router.use("/list_student",listStudent);

import listStudentbyId from './listStudentbyId.js'
router.use("/list_student_by_id",listStudentbyId);

import editStudent from './editStudent.js'
router.use("/edit_student",editStudent);

import deleteStudent from './deleteStudent.js'
router.use("/delete_student",deleteStudent);

//example
import list from './list.js'
router.use("/list",list);

import list2 from './list2.js'
router.use("/list2",list2);

import delete2 from './delete2.js'
router.use("/delete2",delete2);

import searchStudent from './searchStudent.js'
router.use("/search_student",searchStudent);

export default router;