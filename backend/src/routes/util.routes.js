import { Router } from "express";
import { utilController } from "./../controllers/util.controller.js";
const router = Router();

router.get("/lista/:pOperation/:pId", utilController.getCombo);

router.get("/lista/libros", utilController.getListBook);
console.log("ingreso aca");
export default router;
