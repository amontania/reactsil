import  database from "../database/database.js";
import { helper } from "../_util/helper.js";
import {dbconfig} from "./../config/db.js";
import ErrorResponse from "../_util/error.js";

const addBooks = async(req, res)=>{


   
    try {
        const { Id, Title,Author,Editorial,Year,ISBN,TypeAdd,FechaAdd,Descriptores,Status,Usuario } = req.body;
        const results = await database("call spBooks(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
            1,Id, Title,Author,Editorial,Year,ISBN,TypeAdd,FechaAdd,Descriptores,Status,Usuario,0,0]);
          
        if (results.affectedRows) res.status(200).json({ message: "Added" });
            else {
            res.status(400).json({ message: "No" });
            }
   
    } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const updateBooks = async(req, res)=>{

    try {
        const { Id, Title,Author,Editorial,Year,ISBN,TypeAdd,FechaAdd,Descriptores} = req.body;
        const results = await database("call spBooks(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
            2,Id, Title,Author,Editorial,Year,ISBN,TypeAdd,FechaAdd,Descriptores,null,null,0,0]);
        if (results.affectedRows) res.status(200).json({ message: "Updated" });
            else {
            res.status(400).json({ message: "No" });
            }
   
    } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};


const delBooks = async(req,res)=>{
try {
    const {Id} =req.body;
    const results = await database("call spBooks(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
        3,Id, null,null,null,null,null,null,null,null,null,null,0,0]);
    if (results.affectedRows) res.status(200).json({ message: "Deleted" });
        else {
        res.status(400).json({ message: "No Deleted" });
        }

}catch (err){
    res.status(500).send(err.message)
}

};

const searchBooks = async(req,res) =>{
    try {
     const  {page}  = req.query || 1;
     const listPerPage=dbconfig.silserver.listPerPage;
     const offset = helper.getOffset(page,listPerPage );
     const {  Title,Author,ISBN,Status } = req.body;
     const rows = await database("call spBooks(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
       4,0,Title,Author,null,null,ISBN,null,null, null,Status,null,offset,listPerPage ]);
  
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

 const Books = async(req,res,next)=>{
    try {
    const  {page}  = req.query || 1;
    const {listPerPage}= req.query || dbconfig.silserver.listPerPage;
    const offset = helper.getOffset(page,listPerPage );
    console.log(page);
    console.log(listPerPage);
    console.log(offset);
    const rows = await database("call spBooks(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        5,0,null,null,null,null,null,null,null, null,null,null,offset,listPerPage ]);
   
      let data = helper.emptyOrRows(rows);
      let total=0;
      
      if (data.length>2 && data[1][0].Total != undefined ){
        total= data[1][0].Total;}
        data = data[0];
   //     const meta = {page,listPerPage,total};
        res.status(200).json( {data,total} );
    
       } 
       catch(err){
    //    res.status(500).send(err.message);
        return next(new ErrorResponse(err.message,500));
        //    next(err)
  
     }

 }


export const booksController = {
    addBooks,
    updateBooks,
    delBooks,
    searchBooks,
    Books
  };