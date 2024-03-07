import  Joi from "joi";

 const addBook = Joi.object().keys({
  Id: Joi.number().required(),
  Title: Joi.string().required(),
  Author: Joi.string().required(),
  Editorial: Joi.string().required(),
  Year : Joi.number().required(),
  ISBN: Joi.string().required(),
  TypeAdd:Joi.string().required(),
  FechaAdd:Joi.date().required(),
  Descriptores:Joi.string().required(),
  Status:Joi.string().required(),
  Usuario:Joi.string().required(),

 
});

const delBook = Joi.object({
    Id: Joi.number().required()
});

const upateBook =Joi.object({
  Id: Joi.number().required(),
  Title: Joi.string().required(),
  Author: Joi.string().required(),
  Editorial: Joi.string().required(),
  Year : Joi.number().required(),
  ISBN: Joi.string().required(),
  TypeAdd:Joi.string().required(),
  FechaAdd:Joi.date().required(),
  Descriptores:Joi.string().required(),

   
});

const searchBook = Joi.object({
    Id: Joi.number(),
    Title: Joi.string(),
    Author: Joi.string(),
    ISBN: Joi.string(),
    Status:Joi.string(),

});

export  const bookSchema= 
{addBook,delBook,upateBook,searchBook}

