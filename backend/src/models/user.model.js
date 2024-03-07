import  Joi  from "joi";

 const authUserLogin = Joi.object({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(3).required().strict(),
 
});

const authUserRegister = Joi.object({
  userid: Joi.number().required(),
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(3).required().strict(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
  usertype: Joi.string().required()
});

const authUserRecovery = Joi.object({
  username: Joi.string().lowercase().required(),
  usertype:Joi.string().max(1)
  
});

export const authUserSchema = {
  authUserLogin,
  authUserRegister,
  authUserRecovery
 
};

