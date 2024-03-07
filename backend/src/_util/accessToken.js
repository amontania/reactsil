import jwt from "jsonwebtoken";


    const config = process.env;
    function  generateRefreshToken  (user)  {
       return jwt.sign({ id:user.id, userType: user.userType,name:user.displayName }, config.TOKEN_KEY_REFRESH, {expiresIn: config.jwtRefreshExpiration });
        
   };
   
   function generateAccessToken(user) {
       return jwt.sign({id:user.id, userType: user.userType,name:user.displayName}, config.TOKEN_KEY, { expiresIn:  config.jwtExpiration });
     
   }

   export   {generateAccessToken,generateRefreshToken};



   


   