import { Router } from "express";
import { visitController } from "./../controllers/visit.controller.js";

import  SchemaValidator from './../_middleware/schema_validator.js';
const validateRequest = SchemaValidator(true);


const router = Router();

router.get("/",validateRequest,  visitController.getGradoSeccion);

router.post("/add",validateRequest, visitController.addVisit);

router.get("/res",  visitController.getResolution);

export default router;