import  database from "../database/database.js";
import { helper } from "../_util/helper.js";
import   {generateAccessToken,generateRefreshToken} from "../_util/accessToken.js";



const config = process.env;
const getUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;
   console.log(username); 
    const rows = await database("call spUser(?,?,?,?,?,?)", [
      7,0,0,username,"","F"]);
    let user = helper.emptyOrRows(rows);
    user = user[0][0];
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
       role: user.userType,
       expires:168
      }

     res.status(200).cookie('jwt',token,{
      expires: time() + 60,
      secure:false,
      httpOnly:true
     });

     return res.json({
      ...result,
      message:"You are now logged in."

     })
    //   res.status(200).json({user, token: token});

    } else {
      res.status(400).json({ msg: "Invalid Credentials" });

    }
    // user
  } catch (err) {
    res.status(500).json({ msg1: err.message });
  }
};

// Add User

const verifiyUser = async (req, res) => {
  try {
    // Get user input
    const { username,usertype } = req.body;
    const rows = await database("call spUser(?,?,?,?,?,?)", [
      4,0,0,username,"",usertype]);
    let user = helper.emptyOrRows(rows);
    user = user[0][0];
    if (user) {
      user.msg = "ok";
      res.status(200).json(user);
    } else {
      res.status(400).json({ msg: "User not found" });
    }


  } catch (err) {
    res.status(500).json({ msg1: err.message });
  }


};


const getUserById = async (req, res) => {
    try {
      // Get user input
      let  userId  = req.params.userId;
      console.log(userId);
  //    console.log( req.params);
      const rows = await database("call spUser(?,?,?,?,?,?)", [
        9,Number(userId),0,null,"",null]);
      let user = helper.emptyOrRows(rows);
      user = user[0][0];
      if (user) {
        user.msg = "ok";
        res.status(200).json(user);
      } else {
        res.status(400).json({ msg: "User not found" });
      }
  
  
    } catch (err) {
      res.status(500).json({ msg1: err.message });
    }
  
  
  };



const signUser = async (req, res) => {
  try {
    // Get user input
    const { userid,username,password,usertype } = req.body;
    const rows = await database("call spUser(?,?,?,?,?,?)", [
      4,
      0,
      0,
      username,
      "",
      "",
    ]);
    
    let user = helper.emptyOrRows(rows);
    user = user[0][0];
    if (!user) {
      let hashpassword = await helper.cryptPassword(password);
   
      const rows2 = await database("call spUser(?,?,?,?,?,?)", [
        1,0,userid,username,hashpassword,usertype]);
      
      let user2 = helper.emptyOrRows(rows2);
      user = user2[0][0];
   //   const token =  generateAccessToken(user);
  //    const refreshtoken = generateRefreshToken(user);
   //   user.token=token;
  //    user.refreshtoken=refreshtoken;
      user.msg = "ok";
      res.status(201).json(user);


     
     // user.msg = "ok";
   //   res.status(200).json({ msg: "User not found" });
    } else {
     
      res.status(400).json({ msg: "User Already Exists" });
    }

  } catch (err) {
    res.status(500).json({ msg1: err.message });
  }

};







export const userController = {
  getUser,
  getUserById,
  verifiyUser,
  signUser

};
