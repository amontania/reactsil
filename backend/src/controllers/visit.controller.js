import  database from "../database/database.js";
import { helper } from "../_util/helper.js";


const getGradoSeccion = async (req, res) => {
  try {
    const { option } = req.query;
    const rows = await database("call spCombos(?,?)", [option,0]);
    const data = helper.emptyOrRows(rows);
    return res.status(200).json( data[0] );
  } catch (err) {
    res.status(600);
    res.send(err.message);
  }
};

const addVisit = async (req, res) => {
    try {
   
     
      const { pIdLocal,pIdCurso,pNumStudent,pDate,pHour,pTeacher } = req.body;
   
  
      if (pIdLocal === undefined || pIdCurso === undefined) {
        res.status(400).json({ message: "Bad request:Please fill all field." });
      }
      else {
    //  const student = { codigo, descripcion };
      const results = await database("call spRegistroVisitas(?,?,?,?,?,?,?)", [1,pIdLocal,pIdCurso,pNumStudent,pDate,pHour,pTeacher]);
      if (results.affectedRows) res.json({ message: "Added" });
      else {
        res.json({ message: "No" });
      }
    }
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  };

  const getResolution = async (req, res) => {
    try {
      const { pGrado } = req.body;
      const rows = await database("call spGetResolution()");
      const data = helper.emptyOrRows(rows);
      return res.status(200).json({ data });
    } catch (err) {
      res.status(600);
      res.send(err.message);
    }
  };

export const visitController = {
    getGradoSeccion,
    addVisit,
    getResolution
};