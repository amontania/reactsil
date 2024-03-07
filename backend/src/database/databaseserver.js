import mysql from "mysql2/promise";
import {dbconfig} from "./../config/db.js";

const connection =  mysql.createPool(dbconfig.silserver.db);

 const databaseserver = async (sql, params) => {
 
  try {
     
  const [results] = await connection.execute(sql, params);
   return results;
} catch (e) {
   console.log("server!!"+e);
  
} finally
{
  
 
}

};

export default databaseserver;