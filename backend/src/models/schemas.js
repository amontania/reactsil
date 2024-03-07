import {authUserSchema} from "./user.model.js";
import { prestamoSchema } from "./prestamo.model.js";

// console.log(authUserSchema.authUserLogin);
export const Schemas=   {
     '/login': authUserSchema.authUserLogin,
     '/signup': authUserSchema.authUserRegister,
     '/recovery': authUserSchema.authUserRecovery,
     '/addprestamo' :prestamoSchema.addPrestamo,
     '/updateprestamo' :prestamoSchema.upatePrestamo,
     '/deleteprestamo' :prestamoSchema.delPrestamo,
     '/searchprestamo' :prestamoSchema.searchPrestamo,

}