import { booksController } from "./../controllers/books.controller.js";
import {auth,levelLibrary} from "./../_middleware/auth.js";
import { Router } from "express";
import  SchemaValidator from '../_middleware/schema_validator.js';
const validateRequest = SchemaValidator(true);
const booksRouter = Router();

booksRouter.post("/addbook",validateRequest, auth,levelLibrary, booksController.addBooks);

booksRouter.patch("/updatebook",validateRequest, auth, booksController.updateBooks);

booksRouter.delete("/deletebook",validateRequest,auth, booksController.delBooks );

booksRouter.post("/searchbook",validateRequest, auth,levelLibrary, booksController.searchBooks);

booksRouter.get("/books",auth,booksController.Books)

export default booksRouter;