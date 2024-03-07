import mysql from "mysql2/promise";
import {dbconfig} from "./../config/db.js";

const connection =  mysql.createPool(dbconfig.silonline.db);


  const database = async (sql, params) => {
  //const results = {};
  try {
     
  const [results]= await connection.execute(sql, params);
   return results;
} catch (e) {
   console.log("no se encuentra procedure silonline!!"+e);
   connection =  mysql.createPool(dbconfig.silonline.db);
   const results = await connection.execute(sql, params);
   return results;
} finally
{
  
 
}

};


export default database;