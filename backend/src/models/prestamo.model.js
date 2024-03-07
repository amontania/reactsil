import  Joi from "joi";

 const addPrestamo = Joi.object().keys({
  Id: Joi.number().required(),
  IdAlumno: Joi.number().required(),
  IdLibro: Joi.number().required(),
  Estado: Joi.string().required(),
  FechaEntrega : Joi.date().required(),
  FechaDevolucion: Joi.date().required(),
 Usuario:Joi.string().required(),

 
});

const delPrestamo = Joi.object({
    Id: Joi.number().required()
});

const upatePrestamo =Joi.object({
    Id: Joi.number().required(),
    IdLibro: Joi.number().required(),
    FechaEntrega : Joi.date().required(),
    FechaDevolucion: Joi.date().required(),
    FechaDevReal: Joi.date().allow("").allow(null),
    Estado: Joi.string().required()
   
});

const searchPrestamo = Joi.object({
    IdAlumno: Joi.number().required(),
    Year: Joi.number().required(),
});

export  const prestamoSchema= 
{addPrestamo,delPrestamo,upatePrestamo,searchPrestamo}

