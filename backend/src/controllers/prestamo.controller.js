import  database from "../database/database.js";
import { helper } from "../_util/helper.js";
import {dbconfig} from "./../config/db.js";

const addPrestamo = async(req, res)=>{

    try {
        const { Id, IdAlumno,Year,IdLibro,Estado,FechaEntrega,FechaDevolucion,Usuario } = req.body;
        const results = await database("call spPrestamos(?,?,?,?,?,?,?,?,?,?,?,?)",[
            1,Id, IdAlumno,Year,IdLibro,Estado,FechaEntrega,FechaDevolucion,null,Usuario,0,0]);
          
        if (results.affectedRows) res.status(200).json({ message: "Added" });
            else {
            res.status(400).json({ message: "No" });
            }
   
    } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const updatePrestamo = async(req, res)=>{

    try {
        const { Id,IdLibro, Estado,FechaEntrega,FechaDevolucion,FechaDevReal } = req.body;
        const results = await database("call spPrestamos(?,?,?,?,?,?,?,?,?,?,?,?)",[
            2,Id, 0,0,IdLibro,Estado,FechaEntrega,FechaDevolucion,FechaDevReal,null,0,0]);
        if (results.affectedRows) res.status(200).json({ message: "Updated" });
            else {
            res.status(400).json({ message: "No" });
            }
   
    } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};


const delPrestamo = async(req,res)=>{
try {
    const {Id} =req.body;
    const results = await database("call spPrestamos(?,?,?,?,?,?,?,?,?,?,?,?)",[
        3,Id, 0,0,0,null,null,null,null,null,0,0]);
    if (results.affectedRows) res.status(200).json({ message: "Deleted" });
        else {
        res.status(400).json({ message: "No Deleted" });
        }

}catch (err){
    res.status(500).send(err.message)
}

};

const searchPrestamo = async(req,res) =>{
    try {
     const  {page}  = req.query || 1;
     const listPerPage=dbconfig.silserver.listPerPage;
     const offset = helper.getOffset(page,listPerPage );
     const { IdAlumno,Year } = req.body;
     const rows = await database("call spPrestamos(?,?,?,?,?,?,?,?,?,?,?,?)", [
       4,
       0,
       IdAlumno,
       Year,
       0,
       "",
       null,
       null,
       null,
       null,
       offset,
       listPerPage
     ]);
  
     const data = helper.emptyOrRows(rows);
     let total=0;
     if (data.length>2 && data[1][0].Total != undefined ){
     total= data[1][0].Total;}
     const meta = {page,listPerPage,total};
     res.json( {data,meta} );
 
    } 
    catch(err){
       res.status(500).send(err.message);
 
    }
 
 
 }


 const getCoursePrestamo = async (req, res) => {
    try {
      const { pOperation, pId  } = req.params;
     
      
      const [rows, fields] = await database("call spPrestamoxCurso(?,?)", [
        pOperation, pId 
      ]);
      const data = helper.emptyOrRows(rows);
       res.json(data);
   //   console.log(fields);
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  };





export const prestamoController = {
    addPrestamo,
    updatePrestamo,
    delPrestamo,
    searchPrestamo,
    getCoursePrestamo
  };
  
