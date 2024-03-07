
import { studentController } from "./../controllers/students.controller.js";
import {auth,levelLibrary,levelTeacher} from "./../_middleware/auth.js";
import { Router } from "express";
const router = Router();

router.get("/", auth,  studentController.getStudents);

router.get("/:id", auth,levelLibrary, studentController.getStudent);

// router.post("/", auth, studentController.addStudent);

router.post("/searchstudents", auth, levelTeacher,studentController.searchStudent);

export default router;
