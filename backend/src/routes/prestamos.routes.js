import { prestamoController } from "./../controllers/prestamo.controller.js";
import {auth,levelLibrary} from "./../_middleware/auth.js";
import { Router } from "express";
import  SchemaValidator from '../_middleware/schema_validator.js';
const validateRequest = SchemaValidator(true);
const prestamosRouter = Router();

prestamosRouter.post("/addprestamo",validateRequest, auth,levelLibrary, prestamoController.addPrestamo);

prestamosRouter.patch("/updateprestamo",validateRequest, auth, prestamoController.updatePrestamo);

prestamosRouter.delete("/deleteprestamo",validateRequest,auth, prestamoController.delPrestamo );

prestamosRouter.post("/searchprestamo",validateRequest, auth,levelLibrary, prestamoController.searchPrestamo);

prestamosRouter.get("/getcourseprestamo/:pOperation/:pId", prestamoController.getCoursePrestamo);

export default prestamosRouter;