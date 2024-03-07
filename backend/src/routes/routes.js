import studentRoutes from "./students.routes.js";
import userRoutes from "./user.routes.js";
import utilRoutes from "./util.routes.js";
import visitRoutes from "./visit.routes.js";
import authRoutes from "./auth.routes.js";
import prestamosRoutes from "./prestamos.routes.js";
import booksRouter from "./book.routes.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/students", studentRoutes);

router.use("/util", utilRoutes);

router.use("/visit", visitRoutes);

router.use("/prestamo", prestamosRoutes);

router.use("/book",booksRouter);




export default router;