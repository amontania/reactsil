import  database from "../database/database.js";
import { helper } from "../_util/helper.js";
import {dbconfig} from "./../config/db.js";

const getStudents = async (req, res) => {
  try {
    const { page } = req.query || 1;
    const { year,nivel } = req.body;
    const listPerPage=dbconfig.silserver.listPerPage;
    const offset = helper.getOffset(page,listPerPage );
    const rows = await database("call spAlumnosGrados(?,?,?,?,?)", [
      1,
      year,
      nivel,
      offset,
      listPerPage
    ]);
    console.log(rows);
    const data = helper.emptyOrRows(rows);
  //  console.log(data);
  const meta = {page};
    res.json( {data,meta} );
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { year } = req.body;
    console.log(id);
    const [rows, fields] = await database("call spAlumnosGrados(?,?,?,?,?)", [
      4,
      year,
      id,
      0,
      1,
    ]);
    const data = helper.emptyOrRows(rows);
    console.log(data);
    res.json({data});
    console.log(fields);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const addStudent = async (req, res) => {
  try {
    const { codigo, descripcion } = req.body;
    if (codigo === undefined || descripcion == undefined) {
      res.status(400).json({ message: "Bad request:Please fill all field." });
    }
    const student = { codigo, descripcion };
    const results = await database("call spBancos(?,?)", [codigo, descripcion]);
    if (results.affectedRows) res.json({ message: "Added" });
    else {
      res.json({ message: "No" });
    }
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};


const searchStudent = async(req,res) =>{
   try {
    const { page } = req.query || 1;
    const { year,nivel } = req.body;
    const listPerPage=dbconfig.silserver.listPerPage;
    const offset = helper.getOffset(page,listPerPage );
    const rows = await database("call spAlumnosGrados(?,?,?,?,?)", [
      5,
      year,
      nivel,
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

export const studentController = {
  getStudents,
  getStudent,
  addStudent,
  searchStudent
};
