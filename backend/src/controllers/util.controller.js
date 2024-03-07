import  database from "../database/database.js";
import { helper } from "../_util/helper.js";


const getCombo = async (req, res) => {
  try {
    const { pOperation, pId } = req.params;
    console.log("body" +JSON.stringify(req.params));
    const rows = await database("call spCombos(?,?)", [pOperation, pId]);
    const data = helper.emptyOrRows(rows);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(600);
    res.send(err.message);
  }
};

const getListBook = async (req, res) => {
  try{
    const { search } = req.query;
    console.log(req.query);
    const rows = await database("call spListBooks(?,?)", [1, search]);
    const data = helper.emptyOrRows(rows);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(600);
    res.send(err.message);

  } 
}

export const utilController = {
  getCombo,
  getListBook
};
