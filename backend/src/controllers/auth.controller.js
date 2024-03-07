import  database from "../database/database.js";
import { helper } from "../_util/helper.js";
import   {generateAccessToken,generateRefreshToken} from "../_util/accessToken.js";
import jwt from "jsonwebtoken";
import catchAsync from "../lib/catchAsync.js";

import ErrorResponse from "../_util/error.js";


const config = process.env;
const signin  = catchAsync(async (req, res,next) => {
 // try {
    // Get user input
   // res.set('Access-Control-Allow-Origin', '*');
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const rows = await database("call spUser(?,?,?,?,?,?)", [
      7,0,0,email,"","F"]);
    let user = helper.emptyOrRows(rows);
    user = user[0][0];
    console.log(user);
    if (user && await helper.comparePassword(password,user.password) ) {

      delete user.password;
      const token = generateAccessToken(user);
      const refreshtoken = generateRefreshToken(user);

     //user.token=token;
    //  user.refreshtoken=refreshtoken;
      await database("call spToken(?,?,?)",[
        1,refreshtoken,user.id]);
 
        let result={
          id:user.id,
          email: user.email,
          displayName:user.displayName,
          roles:[1000],
          expires:168
         }



        var date = new Date();
        date.setTime(date.getTime() + (60 * 1000));
        
        var date2 = new Date();
        date2.setTime(date.getTime() + (120 * 1000));
       res.cookie("refreshtoken",refreshtoken,{
        expires:date2,
        secure:false,
        httpOnly:true
       });
        res.status(200).cookie("token",token,{
         expires:date,
         secure:false,
         httpOnly:true
        });
   
        return res.json({
         ...result,
         message:"You are now logged in."
   
        })
    } else {
    //  res.status(400).json({ message: "Invalid Credentials" });
    return next(new ErrorResponse("Invalid Credentials",400));

    }
    // user
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
});





const signup  =async(req,res)=>{};




const verifyRefreshToken = async(req,res,next)=>{

 // const cookies = req.cookies
  // console.log(cookies.jwt)
  // const token = cookies.jwt;
  //get refreshToken
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.cookies.refreshtoken);
  let refreshtoken=  req.cookies.refreshtoken;
  // send error if no refreshtoken is sent
  if (!refreshtoken){
  // return res.status(403).json({error:"Access denied, token missing!"});
   return next(new ErrorResponse("Access denied, refreshtoken missing!",403));
  }else{

   //query for the token to check if it is valid:
   const row= await database("call spToken(?,?,?)",[
    2,refreshtoken,0]);
   let rectoken = helper.emptyOrRows(row);
   let cnt= rectoken[0][0].cnt;
   if (Number(cnt)==0){
  //  return res.status(401).json({error:"Refresh token is not in database!"});
    return next(new ErrorResponse("Refresh token is not in database!",403));
   }else{
    try {
    
    const decoded =  jwt.verify(refreshtoken, config.TOKEN_KEY_REFRESH);
    console.log(decoded.id);
    const token =  generateAccessToken(decoded);
    console.log("newtokem"+ token);
    refreshtoken=generateRefreshToken(decoded);
    console.log("newretokem"+ refreshtoken);
    await database("call spToken(?,?,?)",[
      1,refreshtoken,decoded.id]);

      var date = new Date();
      date.setTime(date.getTime() + (60 * 1000));
      
      var date2 = new Date();
      date2.setTime(date2.getTime() + (120 * 1000));
     res.cookie("refreshtoken",refreshtoken,{
      expires:date2,
      secure:false,
      httpOnly:true
     });
      res.status(200).cookie("token",token,{
       expires:date,
       httpOnly:true
      });
      return res.json({
                message:"You are now logged in."
  
       })
    }catch(err){
      if (err.name === "TokenExpiredError") {
        const row= await database("call spToken(?,?,?)",[
          3,refreshtoken,0]);
    //   return res.status(401).send({ msg: "Refresh token was expired. Please make a new signin request" });
        return next(new ErrorResponse("Refresh token was expired. Please make a new signin request",403));
      } else if (err.name === "JsonWebTokenError") {
    //    return res.status(401).json({ msg: "Invalid token,please login again!" });
        return next(new ErrorResponse("Invalid token,please login again!",401));
      } else {
        return next(new ErrorResponse(err.name,400));
      }
       


    }
   
   }

  }

}

const logout= async(req,res,next)=>{
 try {
 
  const refreshtoken = req.cookies.refreshtoken ;
  if (!refreshtoken){
    return res.status(200).json({message:"User logged out!"});
  }
  console.log("out"+refreshtoken);
  req.session = null;
  await database("call spToken(?,?,?)",[
    3,refreshtoken,0]);
    // res.setHeader('Clear-Site-Data', '"cookies"');
    // res.cookie("refreshtoken",null,{
    //   expires:new Date(0),
    //   secure:false,
    //   httpOnly:true})

   return res.status(200).json({message:"User logged out!"});
 }catch(error){
  console.log(error);
  //return res.status(500).json({error:"Internal Server Error."});
  return next(new ErrorResponse("Internal Server Error.",400));
 }
};





export const authController = {
  signin ,
  verifyRefreshToken,
  logout,
  signup
};
