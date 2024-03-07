import jwt from "jsonwebtoken";
import errorHandler from "../_util/errorhandler.js";
import ErrorResponse from "../_util/error.js";
import catchAsync from "../lib/catchAsync.js";

const config = process.env;
// const { TokenExpiredError } = jwt;


const verifyToken = (req, res, next) => {
 // const {token} = req.cookies;
  //get token from request header

  const cookies = req.cookies;
 // console.log(cookies.jwt)
  const token = cookies.token;

//  if (token) {
    try {

      
          if (!token || typeof token === "undefined") {

                return next(new ErrorResponse("A token is required for authentication.",401));
    
          }

            const decoded = jwt.verify(token, config.TOKEN_KEY);
            req.user = decoded;
           
            
          } catch (err) {
       //     console.log("aqui"+err);
          // return  next( errorHandler("error de servidor",  req,res,next));
         
           //  return res.status(401).json({ message: "Token Expired" });
             return next(new ErrorResponse(err.message,403))

          }
          return next();

//}
//else
//{
 // return res.status(403).send({ msg: "A token is required for authentication" });
//}

};


const levelLibrary = (req, res, next) => {
     
         const permiso = req.user.userType;
         if (permiso=="C" || permiso=="B"){
          return next();
         }else
         {
          return next(new ErrorResponse("Acceso Denegado",403));
         }
   
 };

 const levelTeacher = (req, res, next) => {
     
  const permiso = req.user.userType;
  if (permiso=="C" || permiso=="B" || permiso=="R"){
   return next();
  }else
  {
    return next(new ErrorResponse("Acceso Denegado",403));
  }

};








export { verifyToken as auth,
  levelLibrary ,
  levelTeacher
}
